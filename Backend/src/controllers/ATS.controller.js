import { GoogleGenerativeAI } from '@google/generative-ai';
import mammoth from 'mammoth';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// ==========================================
// UTILITY: MULTIMODAL GEMINI AI ENGINE
// ==========================================
const analyzeWithGemini = async (resumeData, jobDescription, isPdf = false) => {
const model = genAI.getGenerativeModel({ 
    model: "gemini-2.5-flash",
    generationConfig: {
      temperature: 0,       // 0 = Strict analytical mode. No creative variation.
      topK: 1,              // Forces the AI to only consider the #1 most logical next word
      topP: 0.1,            // Further restricts random token generation
      responseMimeType: "application/json" // Natively forces clean JSON output
    }
  });
  const safeJobDesc = jobDescription.substring(0, 3000).trim();

  const prompt = `
  You are an elite ATS (Applicant Tracking System) algorithm. Compare the Candidate Resume against the Target Job Description.
  You MUST return your response as a strictly valid JSON object. Do NOT wrap it in markdown blockticks (\`\`\`json). Do not add any conversational text.
  
  Required JSON Structure:
  {
    "score": <number between 0 and 100 representing the match percentage>,
    "fixes": ["<string: critical missing keyword or formatting error>", "<string: critical error>"],
    "improvements": ["<string: actionable suggestion to improve match>", "<string: suggestion>"]
  }

  Target Job Description:
  ${safeJobDesc}
  `;

  // Dynamic Array Payload to support both Text and Files
  let payload = [prompt];

  if (isPdf) {
    // Top-Level: Pass the raw PDF directly to the AI's visual/text engine
    payload.push({
      inlineData: {
        data: resumeData, // This will be the base64 encoded PDF
        mimeType: "application/pdf"
      }
    });
  } else {
    // Pass extracted string data (From Word Docs or Builder JSON)
    const safeResumeText = resumeData.substring(0, 5000).trim();
    payload.push(`\n\nCandidate Resume Data:\n${safeResumeText}`);
  }

  const result = await model.generateContent(payload);
  let rawText = result.response.text().trim();
  
  // Bulletproof JSON Sanitization
  if (rawText.startsWith('```json')) {
    rawText = rawText.replace(/^```json\n?/, '').replace(/\n?```$/, '').trim();
  } else if (rawText.startsWith('```')) {
    rawText = rawText.replace(/^```\n?/, '').replace(/\n?```$/, '').trim();
  }

  try {
    return JSON.parse(rawText);
  } catch (parseError) {
    console.error("Failed to parse Gemini JSON output:", rawText);
    throw new Error("AI returned invalid data structure.");
  }
};

// ==========================================
// ROUTE 1: SCAN PHYSICAL FILE (PDF/DOCX)
// ==========================================
export const scanFile = async (req, res) => {
  try {
    const { jobDescription } = req.body;
    
    if (!req.file) return res.status(400).json({ success: false, message: "No resume file provided." });
    if (!jobDescription) return res.status(400).json({ success: false, message: "Job description is required." });

    let scoreData;

    if (req.file.mimetype === 'application/pdf') {
      // Securely convert the RAM buffer to base64 for Gemini
      const base64Pdf = req.file.buffer.toString("base64");
      scoreData = await analyzeWithGemini(base64Pdf, jobDescription, true);
    } 
    else if (
      req.file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || 
      req.file.mimetype === 'application/msword'
    ) {
      // Word documents are still parsed to text using mammoth
      const docData = await mammoth.extractRawText({ buffer: req.file.buffer });
      if (!docData.value || docData.value.trim().length < 50) {
        return res.status(400).json({ success: false, message: "Could not extract sufficient text from this Word document." });
      }
      scoreData = await analyzeWithGemini(docData.value, jobDescription, false);
    } 
    else {
      return res.status(415).json({ success: false, message: "Unsupported file type." });
    }

    return res.status(200).json({ success: true, scoreData });

  } catch (error) {
    console.error("ATS Scan File Error:", error);
    return res.status(500).json({ success: false, message: error.message || "Failed to score document." });
  }
};

// ==========================================
// ROUTE 2: SCAN RAW JSON (From Jobiffi Builder)
// ==========================================
export const scanJson = async (req, res) => {
  try {
    const { resumeData, jobDescription } = req.body;
    
    if (!resumeData) return res.status(400).json({ success: false, message: "Resume data payload missing." });
    if (!jobDescription) return res.status(400).json({ success: false, message: "Job description is required." });

    const resumeText = JSON.stringify(resumeData); 
    const scoreData = await analyzeWithGemini(resumeText, jobDescription, false);
    
    return res.status(200).json({ success: true, scoreData });

  } catch (error) {
    console.error("ATS Scan JSON Error:", error);
    return res.status(500).json({ success: false, message: "Failed to score JSON data." });
  }
};