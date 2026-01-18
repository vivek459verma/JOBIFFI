export const validateRegister = (req, res, next) => {
  const { name, email, password, mobile, workStatus } = req.body;

  if (!name || !email || !password || !mobile || !workStatus) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      success: false,
      message: "Password must be at least 6 characters",
    });
  }

  next();
};
