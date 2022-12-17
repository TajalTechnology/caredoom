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
    providerName: string;
    photos: string;
    fristName: string;
    lastName: string;
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
        ownGender: { type: String },
        findGender: { type: String },
        isVerify: { type: Boolean, required: true, default: false },
        verificationCode: { type: String, default: "123456" },
        isRemember: { type: Boolean, required: true, default: false },
        verifyTimeLimit: { type: Number, required: true, default: 60 },
        providerName: { type: String },
        photos: { type: String },
        fristName: { type: String },
        lastName: { type: String },
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
    console.log("From modal", user);

    // console.log("user from becrept", candidatePassword, user.password);

    const valid = await bcrypt
        .compare(candidatePassword, user.password)
        .catch((e) => false);
    console.log("isValid:", valid);

    return valid;
};

const UserModel = mongoose.model<UserDocument>("User", userSchema);
export default UserModel;
