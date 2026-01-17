import { body, validationResult } from "express-validator";

export const registerValidation = [
  body("name")
    .notEmpty()
    .withMessage("Name is required"),

  body("email")
    .isEmail()
    .withMessage("Valid email is required"),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),

  body("mobile")
    .matches(/^[0-9]{10}$/)
    .withMessage("Mobile number must be 10 digits"),

  body("workStatus")
    .isIn(["experienced", "fresher"])
    .withMessage("Work status must be experienced or fresher"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }
    next();
  }
];
