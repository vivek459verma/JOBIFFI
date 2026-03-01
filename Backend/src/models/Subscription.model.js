import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    ownerType: {
      type: String,
      enum: ["USER", "RECRUITER"],
      required: true
    },
    planName: {
      type: String,
      default: "FREE"
    },
    features: {
      jobPostLimit: { type: Number, default: 0 },
      resumeUnlockLimit: { type: Number, default: 5 },
      aiCredits: { type: Number, default: 10 },
      earlyAccess: { type: Boolean, default: false }
    },
    expiresAt: { type: Date },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

const Subscription = mongoose.model("Subscription", subscriptionSchema);
export default Subscription;