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

export const validateRegister = (req, res, next) => {
  const { fullName, email, password, mobile, workStatus, currentCity } = req.body;

  if (!fullName || !email || !password || !mobile || !workStatus || !currentCity) {
    return res.status(400).json({ success: false, message: "All required fields must be provided" });
  }

  if (!email.includes("@")) {
    return res.status(400).json({ success: false, message: "Invalid email format" });
  }

  if (password.length < 8) {
    return res.status(400).json({ success: false, message: "Password must be at least 8 characters long" });
  }

  // Updated to include STUDENT to match User Model
  const allowedWorkStatus = ["FRESHER", "EXPERIENCED", "STUDENT"];
  if (!allowedWorkStatus.includes(workStatus)) {
    return res.status(400).json({ success: false, message: "Invalid work status" });
  }

  if (mobile.length !== 10 || isNaN(mobile)) {
    return res.status(400).json({ success: false, message: "Mobile number must be a 10-digit number" });
  }

  next();
};