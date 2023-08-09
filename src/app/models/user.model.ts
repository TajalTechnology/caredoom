import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from "config";

export interface UserInput {
    phnNo: string;
    username: string;
    password: string;
    isVerify: boolean;
    otp: string;
    credit:  number;
}

export interface UserDocument extends UserInput, mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
    comparePassword(candidatePassword: string): Promise<Boolean>;
}

const userSchema = new mongoose.Schema(
    {
        phnNo: { type: String, required: true },
        username: { type: String, required: true },
        password: { type: String, required: true },
        isVerify: { type: Boolean, required: true, default: false },
        otp: { type: String },
        credit: { type: Number, required: true, default: 0}
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
    const valid = await bcrypt
        .compare(candidatePassword, user.password)
        .catch((e) => false);
    return valid;
};

const UserModel = mongoose.model<UserDocument>("User", userSchema);
export default UserModel;
