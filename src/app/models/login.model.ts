import mongoose from "mongoose";
import { UserDocument } from "./user.model";

export interface LoginDocument extends mongoose.Document {
  user: UserDocument["_id"];
  valid: boolean;
  isRemember: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const LoginSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    valid: { type: Boolean, default: true },
    isRemember: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    strict: true,
  }
);

const LoginModel = mongoose.model<LoginDocument>("Login", LoginSchema);
export default LoginModel;
