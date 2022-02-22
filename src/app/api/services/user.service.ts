import UserModel, { UserDocument, UserInput } from "../../models/user.model";
import { omit } from "lodash";
import { FilterQuery } from "mongoose";

export async function createUser(input: Record<string, any>) {
    const user = await UserModel.create(input);
    return user;
};

export async function validatePassword({ email, password }: {
    email: string;
    password: string;
}) {
    const user = await UserModel.findOne({ email });

    if (!user) return false;
    const inValid = await user.comparePassword(password);
    if (!inValid) return false;

    return omit(user.toJSON(), "password");
};

export async function findUser(query: FilterQuery<UserDocument>) {
    return await UserModel.findOne(query).lean();
};
