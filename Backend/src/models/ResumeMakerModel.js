import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema({
  userId: {
    // Note: I temporarily removed 'required: true' and 'unique: true' for userId 
    // so you can test the form with our dummy "test-user-123" without MongoDB blocking it. 
    // You can add it back later when you build the login system!
    type: String, 
  },
  
  // 1. Domain Selection (Triggers the Form Logic)
  domain: { 
    type: String, 
    enum: ['IT', 'Design', 'Sales', 'Management'], 
    default: 'IT',
  },

  // 2. Personal Information (Common for everyone)
  personalInfo: {
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },
    phone: String,
    city: String,
    country: String,
    summary: String, // "Professional Summary"
  },

  // 3. Dynamic Social Links (Frontend shows only what matches the Domain)
  socialLinks: {
    linkedin: String,   // All
    github: String,     // IT
    portfolio: String,  // IT / Design
    behance: String,    // Design
    dribbble: String,   // Design
    twitter: String,    // Marketing
    blog: String        // Marketing / IT
  },

  // 4. Experience with Metrics (Crucial for Sales/Management)
  experience: [
    {
      company: String,
      position: String,
      startDate: String,
      endDate: String,
      current: { type: Boolean, default: false },
      description: String, // General responsibilities
      keyAchievements: String // e.g., "Increased revenue by 20%" (Sales) or "Reduced latency by 40ms" (IT)
    }
  ],

  // 5. Education (Standard)
  education: [
    {
      institution: String,
      degree: String,
      fieldOfStudy: String,
      startDate: String,
      endDate: String,
      grade: String // GPA or Percentage
    }
  ],

  // 6. Domain Specific Skills (Stored as categories)
  skills: [
    {
      category: String, // e.g., "Programming Languages" or "Design Software"
      items: [String]   // e.g., ["Python", "JS"] or ["Figma", "Photoshop"]
    }
  ],

  // 7. Projects (IT/Design) or Campaigns (Marketing)
  projects: [
    {
      title: String,
      role: String, 
      link: String,
      description: String,
      technologies: [String] 
    }
  ],

  // 8. Custom Sections (Certifications, Awards, Volunteer)
  certifications: [
    {
      name: String,
      issuer: String,
      date: String,
      link: String
    }
  ],

  // 9. Template Config
  theme: {
    type: String,
    default: "classic" 
  },
  
  // 10. A catch-all for our current Frontend React Form Data
  resumeData: {
      type: Object
  }

}, { timestamps: true });

// ✅ CHANGED: This is now a Default Export matching your Controller
const ResumeMakerModel = mongoose.model("ResumeMaker", resumeSchema);
export default ResumeMakerModel;