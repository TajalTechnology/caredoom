import UserModel, { UserDocument, UserInput } from "../../models/user.model";
import { omit } from "lodash";
import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import _responce from "../../common/utils/res.message";
import LoginModel from "../../models/login.model";
import { signJwt } from "../../common/utils/jwt";
import config from "config";
import bcrypt from "bcrypt";

export async function createUser(input: Record<string, any>) {
  const responseData: any = {};
  if (input.phnNo) input.phnNo = "+880" + input.phnNo;
  //TODO: need to optimize this query
  let duplicateUser: any;
  if (input.email && !input.phnNo) {
    duplicateUser = await UserModel.findOne({ email: input.email });
  } else if (!input.email && input.phnNo) {
    duplicateUser = await UserModel.findOne({ phnNo: input.phnNo });
  } else {
    duplicateUser = await UserModel.findOne({
      $or: [{ email: input.email }, { phnNo: input.phnNo }],
    });
  }

  !duplicateUser
    ? (responseData.data = await UserModel.create(input))
    : (responseData.message = _responce.duplicateUser);

  return responseData;
}

export async function verifyOTP(
  input: UpdateQuery<UserDocument>,
  options: QueryOptions
) {
  if (input.phnNo) input.phnNo = "+880" + input.phnNo;

  const responseData: any = {};
  const verifyWith = input.email ? input.email : input.phnNo;
  const filter = {
    $and: [
      { $or: [{ email: verifyWith }, { phnNo: verifyWith }] },
      {
        $or: [{ verificationCode: input.verificationCode }, { isVerify: true }],
      },
    ],
  };
  const update = { verificationCode: null, isVerify: true };
  const user: any = await UserModel.findOneAndUpdate(filter, update, options);

  if (user?.isVerify === true) {
    responseData.sucess = _responce.verificationSucess;
  } else {
    responseData.failed = _responce.verificationFailed;
  }
  return responseData;
}

export async function createLogin(input: Record<string, any>) {
  // TODO: sign in with otp
  const responseData: any = {};
  if (input.phnNo) input.phnNo = "+880" + input.phnNo;
  let user: any;
  if (input.verificationCode) {
    user = await UserModel.findOneAndUpdate(
      {
        $and: [
          { phnNo: input.phnNo },
          { verificationCode: input.verificationCode },
        ],
      },
      { verificationCode: null },
      { new: true }
    );
  } else {
    const loginWith = input.email
      ? input.email
      : input.phnNo
      ? input.phnNo
      : input.username;

    user = await UserModel.findOne({
      $or: [
        { email: loginWith },
        { phnNo: loginWith },
        { username: loginWith },
      ],
    });

    //TODO: shoud be implementing as a differenct function
    const valid = await bcrypt
      .compare(input.password, user.password)
      .catch((e) => false);
    if (!valid) {
      return (responseData.message = "Incorrect account or password");
    }
  }

  if (!user) {
    return (responseData.message = "Wrong credentials.Please try again");
  }

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
  // }

  // return (responseData.message = "Incorrect account or password");
}

export async function resendOtp(
  input: UpdateQuery<UserDocument>,
  options: QueryOptions
) {
  if (input.phnNo) input.phnNo = "+880" + input.phnNo;
  const responseData: any = {};
  let otp = "123456";

  const otpSend = input.email ? input.email : input.phnNo;
  const filter = {
    $or: [{ email: otpSend }, { phnNo: otpSend }],
  };
  const update = { verificationCode: otp };
  const user = await UserModel.findOneAndUpdate(filter, update, options);

  // TODO: need to send code in mail
  user
    ? (responseData.verificationCode = user.verificationCode)
    : (responseData.message = "Your credential may be wrong. Try again");
  return responseData;
}

export async function resetPassword(
  input: UpdateQuery<UserDocument>,
  options: QueryOptions
) {
  const responseData: any = {};
  if (input.phnNo) input.phnNo = "+880" + input.phnNo;
  const hash = bcrypt.hashSync(
    input.password,
    await bcrypt.genSalt(config.get<number>("saltWorkFactor"))
  );

  const resetPassWith = input.email ? input.email : input.phnNo;
  const filter = {
    $and: [
      { $or: [{ email: resetPassWith }, { phnNo: resetPassWith }] },
      { isVerify: true },
    ],
  };
  const update = {
    verificationCode: null,
    password: hash,
  };
  const user = await UserModel.findOneAndUpdate(filter, update, options);

  user
    ? (responseData.data = true)
    : (responseData.message = _responce.passwordUpdateFailed);

  return responseData;
}
