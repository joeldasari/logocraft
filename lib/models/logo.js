import mongoose from "mongoose";

const Logo = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    logos: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.models.Logo || mongoose.model("Logo", Logo);
