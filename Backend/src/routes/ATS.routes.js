import express from 'express';
import multer from 'multer';
import { scanFile, scanJson } from '../controllers/ATS.controller.js';

const router = express.Router();

// ==========================================
// MULTER SECURITY CONFIGURATION
// ==========================================
const upload = multer({ 
  storage: multer.memoryStorage(), // Keep in RAM, don't write to cPanel disk
  limits: { 
    fileSize: 5 * 1024 * 1024 // Hard limit: 5MB max file size
  },
  fileFilter: (req, file, cb) => {
    // Only allow specific mimetypes
    const allowedMimeTypes = [
      'application/pdf', 
      'application/msword', 
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only PDF and Word documents are allowed."), false);
    }
  }
});

// Helper middleware to catch Multer file size/type errors gracefully
const handleUploadErrors = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ success: false, message: `Upload Error: ${err.message}` });
  } else if (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
  next();
};

// ==========================================
// ROUTES
// ==========================================
// We do not lock these behind verifyToken because the base scan is a free feature.
router.post('/scan-file', upload.single('resumeFile'), handleUploadErrors, scanFile);
router.post('/scan-json', scanJson);

export default router;