import express from 'express';
// Import the secure functions we wrote in your controller
import { generateDescription, saveResume } from '../controllers/ResumeMaker.controller.js';

const router = express.Router();

// 1. Route for the AI Co-Pilot (Points to the controller)
router.post('/generate-description', generateDescription); 

// 2. Route for saving the final resume to the database (Points to the controller)
router.post('/save', saveResume); 

// ✅ THIS IS THE LINE THAT FIXES YOUR SERVER CRASH:
export default router;