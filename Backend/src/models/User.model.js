import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["JOB_SEEKER"],
      default: "JOB_SEEKER",
      immutable: true
    },

    fullName: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,      // ✅ This already creates an index automatically
      lowercase: true,
      trim: true
    },

    // Required for email signup, optional for OAuth
    passwordHash: {
      type: String,
      required: function() {
        return this.authProvider === "EMAIL";
      }
    },

    // Required for email signup, optional for OAuth (filled during onboarding)
    mobile: {
      type: String,
      required: function() {
        return this.authProvider === "EMAIL";
      }
    },

    // Required for email signup, optional for OAuth
    workStatus: {
      type: String,
      enum: ["FRESHER", "EXPERIENCED", "STUDENT"],
      required: function() {
        return this.authProvider === "EMAIL";
      }
    },

    // Required for email signup, optional for OAuth
    currentCity: {
      type: String,
      required: function() {
        return this.authProvider === "EMAIL";
      }
    },

    communicationConsent: {
      sms: { type: Boolean, default: false },
      email: { type: Boolean, default: false },
      whatsapp: { type: Boolean, default: false }
    },

    // STUDENT DETAILS (optional, only for students)
    studentDetails: {
      collegeName: { type: String },
      degree: { type: String },
      graduationYear: { type: Number }
    },

    // SOCIAL AUTH FIELDS
    googleId: {
      type: String,
      sparse: true,      // ✅ sparse already creates an index automatically
      unique: true       // ✅ unique also creates an index automatically
    },

    linkedInId: {
      type: String,
      sparse: true,      // ✅ sparse already creates an index automatically
      unique: true       // ✅ unique also creates an index automatically
    },

    authProvider: {
      type: String,
      enum: ["EMAIL", "GOOGLE", "LINKEDIN"],
      default: "EMAIL"
    },

    profilePicture: {
      type: String,
      default: null
    },

    profileCompletion: {
      type: Number,
      default: 20
    },

    isActive: {
      type: Boolean,
      default: true
    },

    lastLoginAt: {
      type: Date,
      default: null
    },

    isEmailVerified: {
      type: Boolean,
      default: false
    },

    emailVerificationToken: {
      type: String
    },

    emailVerificationExpires: {
      type: Date
    }
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;