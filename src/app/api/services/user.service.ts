import UserModel, { UserDocument} from "../../models/user.model";
import { QueryOptions, UpdateQuery } from "mongoose";
import _responce from "../../common/utils/res.message";
import LoginModel from "../../models/login.model";
import { signJwt } from "../../common/utils/jwt";
import config from "config";
import bcrypt from "bcrypt";

export async function createUser(input: Record<string, any>): Promise<any> {
    const user = await UserModel.findOne({ phnNo: input.phnNo });
    if(!user) return await UserModel.create(input);
    else { return false; }
}

export async function createLogin(input: Record<string, any>) {
    const user = await UserModel.findOne({phnNo:input.phnNo});
    const accessToken = signJwt(
        { ...user },
        { expiresIn: config.get("accessTokenTtl") }
    );

    return {accessToken};
    
}
