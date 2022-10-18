import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from "config";

export interface UserInput {
  email: string;
  phnNo: string;
  username: string;
  password: string;
  ownGender: string;
  findGender: string;
  isVerify: boolean;
  verificationCode: string;
  verifyTimeLimit: string;
  isRemember: boolean;
}

export interface UserDocument extends UserInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<Boolean>;
}

const userSchema = new mongoose.Schema(
  {
    phnNo: { type: String },
    email: { type: String },
    username: { type: String },
    password: { type: String },
    ownGender: { type: String, required: true },
    findGender: { type: String, required: true },
    isVerify: { type: Boolean, required: true, default: false },
    verificationCode: { type: String, default: 123456 },
    isRemember: { type: Boolean, required: true, default: false },
    verifyTimeLimit: { type: Number, required: true, default: 60 },
  },
  {
    timestamps: true,
    strict: true,
  }
);

userSchema.pre("save", async function (next) {
  let user = this as unknown as UserDocument;
  if (!user.isModified("password")) return next();
  const salt = await bcrypt.genSalt(config.get<number>("saltWorkFactor"));
  const hash = bcrypt.hashSync(user.password, salt);
  user.password = hash;

  return next();
});

userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  const user = this as UserDocument;
  return bcrypt.compare(candidatePassword, user.password).catch((e) => false);
};

const UserModel = mongoose.model<UserDocument>("User", userSchema);
export default UserModel;
