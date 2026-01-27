export const validateEmployerRegister = (req, res, next) => {
  const {
    companyName,
    email,
    password,
    contactPerson,
    mobile,
    companySize,
    industry,
  } = req.body;

  // Check required fields
  if (
    !companyName ||
    !email ||
    !password ||
    !contactPerson ||
    !mobile ||
    !companySize ||
    !industry
  ) {
    return res.status(400).json({
      success: false,
      message: "All required fields must be provided",
    });
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: "Invalid email format",
    });
  }

  // Validate password length
  if (password.length < 8) {
    return res.status(400).json({
      success: false,
      message: "Password must be at least 8 characters long",
    });
  }

  // Validate mobile number (basic validation)
  const mobileRegex = /^[0-9]{10,15}$/;
  if (!mobileRegex.test(mobile.replace(/[\s-]/g, ""))) {
    return res.status(400).json({
      success: false,
      message: "Invalid mobile number format",
    });
  }

  // Validate company size
  const validCompanySizes = [
    "1-10",
    "11-50",
    "51-200",
    "201-500",
    "501-1000",
    "1000+",
  ];
  if (!validCompanySizes.includes(companySize)) {
    return res.status(400).json({
      success: false,
      message: "Invalid company size",
    });
  }

  // Validate website URL if provided
  if (req.body.website) {
    const urlRegex =
      /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    if (!urlRegex.test(req.body.website)) {
      return res.status(400).json({
        success: false,
        message: "Invalid website URL format",
      });
    }
  }

  next();
};
