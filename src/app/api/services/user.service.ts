import UserModel, { UserDocument, UserInput } from "../../models/user.model";
import { omit } from "lodash";
import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import _responce from "../../common/utils/res.message";

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

export async function updateOTP(
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
    ? (responseData.data = user)
    : (responseData.message = _responce.verificationFailed);

  return responseData;
}

export async function validatePassword({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const user = await UserModel.findOne({ email });

  if (!user) return false;
  const inValid = await user.comparePassword(password);
  if (!inValid) return false;

  return omit(user.toJSON(), "password");
}

// const findOne = (modelName:string, queryObject:object,options?:any) =>{
//   return `${modelName}`.findOne(queryObject).
// }
export async function findUser(query: FilterQuery<UserDocument>) {
  return await UserModel.findOne(query).lean();
}
