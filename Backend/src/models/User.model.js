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
      lowercase: true,
      trim: true
    },

    // Required for email signup, optional for OAuth
    passwordHash: {
      type: String,
      required: function () {
        return this.authProvider === "EMAIL";
      }
    },

    // Required for email signup, optional for OAuth (filled during onboarding)
    mobile: {
      type: String,
      maxlength: 16, // E.164 allows up to 15 digits + '+' sign
      validate: {
        validator: function (v) {
          // If OAuth, allow empty if not set (to be filled during onboarding)
          if (this.authProvider !== "EMAIL" && !v) return true;
          return /^\+[1-9]\d{1,14}$/.test(v);
        },
        message: props => `${props.value} is not a valid international phone number!`
      },
      required: function () {
        return this.authProvider === "EMAIL";
      }
    },

    // Required for email signup, optional for OAuth
    workStatus: {
      type: String,
      enum: ["FRESHER", "EXPERIENCED", "STUDENT"],
      required: function () {
        return this.authProvider === "EMAIL";
      }
    },

    // Required for email signup, optional for OAuth
    currentCity: {
      type: String,
      required: function () {
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
      type: String
    },

    linkedInId: {
      type: String
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

    resume: {
      type: String, // Cloudinary URL
      default: null
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

// Unified Index Definitions (Fixes "Duplicate schema index" warnings)
userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ googleId: 1 }, { unique: true, sparse: true });
userSchema.index({ linkedInId: 1 }, { unique: true, sparse: true });

const User = mongoose.model("User", userSchema);
export default User;