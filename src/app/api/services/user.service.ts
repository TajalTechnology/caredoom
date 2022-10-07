import UserModel, { UserDocument, UserInput } from "../../models/user.model";
import { omit } from "lodash";
import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import _responce from "../../common/utils/res.message";
import LoginModel from "../../models/login.model";
import { signJwt } from "../../common/utils/jwt";
import config from "config";

export async function createUser(input: Record<string, any>) {
  const responseData: any = {};

  const duplicateUser = await UserModel.findOne({
    $or: [{ email: input.email }, { phnNo: input.phnNo }],
  });

  !duplicateUser
    ? (responseData.data = await UserModel.create(input))
    : (responseData.message = _responce.duplicateUser);

  return responseData;
}

export async function verifyOTP(
  input: UpdateQuery<UserDocument>,
  options: QueryOptions
) {
  const responseData: any = {};

  const filter = {
    $and: [
      {
        $or: [{ email: input.email }, { phnNo: input.phnNo }],
      },
      { verificationCode: input.verificationCode },
    ],
  };
  const update = { verificationCode: null, isVerify: true };
  const user = await UserModel.findOneAndUpdate(filter, update, options);

  user
    ? (responseData.data = true)
    : (responseData.message = _responce.verificationFailed);

  return responseData;
}

export async function createLogin(input: Record<string, any>) {
  const responseData: any = {};

  const user: any = await UserModel.findOne({
    $or: [{ email: input.email }, { phnNo: input.phnNo }],
  });
  const validPassword = await user.comparePassword(input.password);
  if (user && validPassword) {
    const login = await LoginModel.create({ user: user._id });

    // create an access token
    const accessToken = signJwt(
      { ...user, session: login._id },
      { expiresIn: config.get("accessTokenTtl") } // 15 minutes
    );

    // create a refresh token
    const refreshToken = signJwt(
      { ...user, session: login._id },
      { expiresIn: config.get("refreshTokenTtl") } // 15 minutes
    );

    if (accessToken && refreshToken) {
      return (responseData.data = { accessToken, refreshToken });
    }
  }
  return (responseData.message = "Login failed");

  // const duplicateUser = await UserModel.findOne({
  //   $or: [{ email: input.email }, { phnNo: input.phnNo }],
  // });

  // !duplicateUser
  //   ? (responseData.data = await UserModel.create(input))
  //   : (responseData.message = _responce.duplicateUser);

  // return responseData;
}

export async function resendOtp(
  input: UpdateQuery<UserDocument>,
  options: QueryOptions
) {
  const responseData: any = {};
  let otp = "123457";

  const filter = {
    $or: [{ email: input.email }, { phnNo: input.phnNo }],
  };
  const update = { verificationCode: otp };
  const user = await UserModel.findOneAndUpdate(filter, update, options);
  // TODO: need to send code in mail
  otp ? (responseData.otp = otp) : (responseData.message = "Otp resend failed");
  return responseData;
}

export async function validatePassword({
  email,
  password,
  phnNo,
}: {
  email: string;
  password: string;
  phnNo: string;
}) {
  const user = await UserModel.findOne({ $or: [{ email }, { phnNo }] });
  if (!user) return false;
  const inValid = await user.comparePassword(password);
  if (!inValid) return false;

  return omit(user.toJSON(), "password");
}

export async function findUser(query: FilterQuery<UserDocument>) {
  return await UserModel.findOne(query).lean();
}

export async function resetPassword(
  input: UpdateQuery<UserDocument>,
  options: QueryOptions
) {
  const responseData: any = {};

  const filter = {
    $or: [{ email: input.email }, { phnNo: input.phnNo }],
  };
  const update = { verificationCode: null, isVerify: true };
  const user = await UserModel.findOneAndUpdate(filter, update, options);

  user
    ? (responseData.data = true)
    : (responseData.message = _responce.passwordUpdateFailed);

  return responseData;
}
