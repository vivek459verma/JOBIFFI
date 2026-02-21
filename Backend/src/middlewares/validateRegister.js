// export const validateRegister = (req, res, next) => {
//   const {
//     fullName,
//     email,
//     password,
//     mobile,
//     workStatus,
//     currentCity
//   } = req.body;

//   // 1. Required fields
//   if (
//     !fullName ||
//     !email ||
//     !password ||
//     !mobile ||
//     !workStatus ||
//     !currentCity
//   ) {
//     return res.status(400).json({
//       success: false,
//       message: "All required fields must be provided"
//     });
//   }

//   // 2. Email format (keep it simple)
//   if (!email.includes("@")) {
//     return res.status(400).json({
//       success: false,
//       message: "Invalid email format"
//     });
//   }

//   // 3. Password length
//   if (password.length < 8) {
//     return res.status(400).json({
//       success: false,
//       message: "Password must be at least 8 characters long"
//     });
//   }

//   // 4. Work status enum
//   const allowedWorkStatus = ["FRESHER", "EXPERIENCED"];
//   if (!allowedWorkStatus.includes(workStatus)) {
//     return res.status(400).json({
//       success: false,
//       message: "Invalid work status"
//     });
//   }

//   // 5. Mobile number length (India-focused, simple)
//   if (mobile.length !== 10 || isNaN(mobile)) {
//     return res.status(400).json({
//       success: false,
//       message: "Mobile number must be a 10-digit number"
//     });
//   }

//   next();
// };

import { isPasswordSecure } from "../utils/passwordValidator.js";

export const validateRegister = (req, res, next) => {
  const body = req.body || {};
  const { fullName, email, password, mobile, workStatus, currentCity } = body;

  if (!fullName || !email || !password || !mobile || !workStatus || !currentCity) {
    return res.status(400).json({ success: false, message: "All required fields must be provided" });
  }

  if (!email.includes("@")) {
    return res.status(400).json({ success: false, message: "Invalid email format" });
  }

  if (!isPasswordSecure(password)) {
    return res.status(400).json({
      success: false,
      message: "Password must be at least 8 characters and include uppercase, lowercase, a number, and a special character."
    });
  }

  // Updated to include STUDENT to match User Model
  const allowedWorkStatus = ["FRESHER", "EXPERIENCED", "STUDENT"];
  if (!allowedWorkStatus.includes(workStatus)) {
    return res.status(400).json({ success: false, message: "Invalid work status" });
  }

  // Validate International Phone Format (E.164)
  const phoneRegex = /^\+[1-9]\d{1,14}$/;
  if (!phoneRegex.test(mobile)) {
    return res.status(400).json({
      success: false,
      message: "Invalid mobile number. Must be in international format (e.g., +91XXXXXXXXXX)"
    });
  }

  next();
};