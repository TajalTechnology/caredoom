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
  const responseData: any = {};

  let filter: any;
  if (input.email && !input.phnNo) {
    filter = {
      $and: [
        { email: input.email },
        { verificationCode: input.verificationCode },
      ],
    };
  } else if (!input.email && input.phnNo) {
    filter = {
      $and: [
        { phnNo: input.phnNo },
        { verificationCode: input.verificationCode },
      ],
    };
  } else {
    filter = {
      $and: [
        { phnNo: input.phnNo },
        { email: input.email },
        { verificationCode: input.verificationCode },
      ],
    };
  }

  const update = { verificationCode: null, isVerify: true };
  const user = await UserModel.findOneAndUpdate(filter, update, options);
  console.log(user);

  user
    ? (responseData.sucess = _responce.verificationSucess)
    : (responseData.failed = _responce.verificationFailed);

  return responseData;
}

export async function createLogin(input: Record<string, any>) {
  const responseData: any = {};
  const loginWith = input.email
    ? input.email
    : input.phnNo
    ? input.phnNo
    : input.username;

  const user: any = await UserModel.findOne({
    $or: [{ email: loginWith }, { phnNo: loginWith }, { username: loginWith }],
  });

  if (!user) {
    return (responseData.message = "Can not find account");
  }

  //TODO: shoud be implementing as a differenct function
  const valid = await bcrypt
    .compare(input.password, user.password)
    .catch((e) => false);

  if (valid) {
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

  return (responseData.message = "Incorrect account or password");
}

export async function resendOtp(
  input: UpdateQuery<UserDocument>,
  options: QueryOptions
) {
  const responseData: any = {};
  let otp = "123457";

  const otpSend = input.email ? input.email : input.phnNo;
  const filter = {
    $or: [{ email: otpSend }, { phnNo: otpSend }],
  };
  const update = { verificationCode: otp };
  const user = await UserModel.findOneAndUpdate(filter, update, options);

  // TODO: need to send code in mail
  user
    ? (responseData.verificationCode = user.verificationCode)
    : (responseData.message = "Otp resend failed");
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
  const hash = bcrypt.hashSync(
    input.password,
    await bcrypt.genSalt(config.get<number>("saltWorkFactor"))
  );
  const filter = {
    $and: [
      { $or: [{ email: input.email }, { phnNo: input.phnNo }] },
      { isVerify: true },
    ],
  };
  const update = {
    verificationCode: null,
    isVerify: true,
    password: (input.password = hash),
  };
  const user = await UserModel.findOneAndUpdate(filter, update, options);
  user
    ? (responseData.data = true)
    : (responseData.message = _responce.passwordUpdateFailed);

  return responseData;
}
