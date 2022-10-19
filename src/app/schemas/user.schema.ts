import { z, object, TypeOf, ZodIssueCode } from "zod";
import _responce from "../common/utils/res.message";

const userPayload = {
  body: object({
    email: z.string().email(),
    phnNo: z.string().min(9).max(11),
    ownGender: z.string(),
    findGender: z.string(),
  })
    .partial()
    .refine(({ email, phnNo }) => email !== undefined || phnNo !== undefined, {
      message: "email should be set if phone number isn't",
    }),
};

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
    // TODO: required not working
    verificationCode: z.string({ invalid_type_error: "SHould be string" }),
  })
    .partial()
    .refine(({ email, phnNo }) => email !== undefined || phnNo !== undefined, {
      message: "email should be set if phone number isn't",
    }),
};

export const verifyOtpSchema = object({ ...otpPayload });
export type verifyOTPInput = TypeOf<typeof verifyOtpSchema>;

/**
 * ***************login schema******************
 */

const loginPayload = {
  body: object({
    password: z.string().min(6).max(32),
    email: z.string().email(),
    phnNo: z.string().min(9).max(11),
  })
    .partial()
    .refine(({ email, phnNo }) => email !== undefined || phnNo !== undefined, {
      message: "email should be set if phone number isn't",
    }),
};

export const createLoginSchema = object({ ...loginPayload });
export type createLoginInput = TypeOf<typeof createLoginSchema>;

/**
 * ***************login schema******************
 */

const resendOtpPayload = {
  body: object({
    email: z.string().email(),
    phnNo: z.string().min(9).max(11),
  })
    .partial()
    .refine(({ email, phnNo }) => email !== undefined || phnNo !== undefined, {
      message: "email should be set if phone number isn't",
    }),
};

export const resendOtpSchema = object({ ...resendOtpPayload });
export type resendOtpInput = TypeOf<typeof resendOtpSchema>;

const passwordPayload = {
  body: object({
    password: z.string().min(6).max(32),
    passwordConfirmation: z.string().min(6).max(32),
  }),
};

export const resetPasswordSchema = object({
  ...resendOtpPayload,
  ...passwordPayload,
});
export type resetPasswordInput = TypeOf<typeof resetPasswordSchema>;
