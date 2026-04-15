import express from 'express';
import jwt from 'jsonwebtoken';
import { 
  generateDescription, 
  saveResume, 
  getMyResumes ,
  deleteResume
} from '../controllers/ResumeMaker.controller.js';

const router = express.Router();



/**
 * 🛡️ AUTH MIDDLEWARE
 * Verifies the Bearer token sent from React LocalStorage
 */
const requireAuth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'Unauthorized: No token provided.' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Attach user info to request for the controller
    req.user = decoded; 
    next(); 
  } catch (error) {
    console.error("Auth Middleware Error:", error.message);
    return res.status(401).json({ success: false, message: 'Session expired. Please login again.' });
  }
};
// Import the new function at the top



// --- ROUTES ---
router.get('/my-resumes', requireAuth, getMyResumes);
router.post('/generate-description', requireAuth, generateDescription); 
router.post('/save', requireAuth, saveResume); 
router.delete('/delete/:id', requireAuth, deleteResume);

export default router;