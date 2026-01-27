import mongoose from "mongoose";

const employerSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    contactPerson: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    companySize: {
      type: String,
      enum: ["1-10", "11-50", "51-200", "201-500", "501-1000", "1000+"],
      required: true,
    },
    industry: {
      type: String,
      required: true,
    },
    website: {
      type: String,
      trim: true,
    },
    address: {
      street: String,
      city: String,
      state: String,
      country: String,
      zipCode: String,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    logo: {
      type: String,
      default: null,
    },
    description: {
      type: String,
      maxlength: 1000,
    },
    emailVerificationOTP: {
      type: String,
      default: null,
    },
    otpExpiry: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

// Index for faster email lookups
employerSchema.index({ email: 1 });

export default mongoose.model("Employer", employerSchema);
