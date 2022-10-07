import { z, object, TypeOf, ZodIssueCode } from "zod";
import _responce from "../common/utils/res.message";

const userPayload = {
  body: object({
    username: z.string(),
    password: z.string().min(6).max(32),
    passwordConfirmation: z.string().min(6).max(32),
    email: z.string().email(),
    phnNo: z.string().min(9).max(11),
    ownGender: z.string(),
    findGender: z.string(),
    isRemember: z.boolean(),
  })
    .partial()
    .superRefine((data, ctx) => {
      if (data.password !== data.passwordConfirmation) {
        ctx.addIssue({
          code: ZodIssueCode.custom,
          path: ["password"],
          message: "password and passwordConfirmation didn't match",
        });
      }
      if (!data.email && !data.phnNo) {
        ctx.addIssue({
          code: ZodIssueCode.custom,
          path: ["email"],
          message: "email should be set if phone number isn't",
        });
      }
    }),
};

userPayload;
/* create user */
export const createUserSchema = object({ ...userPayload });
export type createUserInput = Omit<
  TypeOf<typeof createUserSchema>,
  "body.passwordConfirmation"
>;

/**
 * ***************otp schema******************
 */

/* validation for body */
const otpPayload = {
  body: object({
    email: z.string().email(),
    phnNo: z.string().min(9).max(11),
    verificationCode: z.number({ required_error: _responce.otpRequired }),
  })
    .partial()
    .refine(({ email, phnNo }) => email !== undefined || phnNo !== undefined, {
      message: "email should be set if phone number isn't",
    }),
};

// const params = {
//   params: object({
//     _id: z.string({ required_error: _responce.userIdRequired }),
//   }),
// };

export const updateOtpSchema = object({ ...otpPayload });
export type updateOtpInput = TypeOf<typeof updateOtpSchema>;
