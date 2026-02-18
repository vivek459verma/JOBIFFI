import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    mobile: { type: String, required: true },
    resumesCreated: {
      type: Number,
      default: 0 },
    aiCredits: {
      type: Number,
      default: 120 // 10 resumes * 12 credits
      },
    workStatus: {
      type: String,
      enum: ["fresher", "experienced"],
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
