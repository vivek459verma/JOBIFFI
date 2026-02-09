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
      unique: true,
      lowercase: true,
      trim: true
    },

    // 🔐 Make passwordHash optional for social login
    passwordHash: {
      type: String,
      required: function() {
        return this.authProvider === "EMAIL";
      }
    },

    mobile: {
      type: String,
      required: function() {
        // Mobile required only after onboarding
        return this.profileCompletion >= 50;
      }
    },

    // ✅ NOW ALIGNED WITH FRONTEND
    workStatus: {
      type: String,
      enum: ["FRESHER", "EXPERIENCED", "STUDENT"],
      required: function() {
        // Work status required only after onboarding
        return this.profileCompletion >= 50;
      }
    },

    currentCity: {
      type: String,
      required: function() {
        // City required only after onboarding
        return this.profileCompletion >= 50;
      }
    },

    communicationConsent: {
      sms: { type: Boolean, default: false },
      email: { type: Boolean, default: false },
      whatsapp: { type: Boolean, default: false }
    },

    // 🆕 STUDENT DETAILS (optional, only for students)
    studentDetails: {
      collegeName: { type: String },
      degree: { type: String },
      graduationYear: { type: Number }
    },

    // 🆕 SOCIAL AUTH FIELDS
    googleId: {
      type: String,
      sparse: true,
      unique: true
    },

    linkedInId: {
      type: String,
      sparse: true,
      unique: true
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

// 🔍 Index for faster lookups
userSchema.index({ email: 1 });
userSchema.index({ googleId: 1 });
userSchema.index({ linkedInId: 1 });

const User = mongoose.model("User", userSchema);
export default User;