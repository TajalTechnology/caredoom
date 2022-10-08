import validation from "../common/middlewares/validation";
import { NextFunction, Request, Response, Express } from "express";
import {
  createUserInput,
  createUserSchema,
  verifyOtpSchema,
  verifyOTPInput,
  createLoginSchema,
  createLoginInput,
  resendOtpSchema,
  resendOtpInput,
  resetPasswordSchema,
  resetPasswordInput,
} from "../schemas/user.schema";
import {
  createLogin,
  createUser,
  resendOtp,
  resetPassword,
  verifyOTP,
} from "./services/user.service";

/* try-catch handle */
const tryCatch =
  (fn: any) => (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);

/* all routes */
module.exports = function (router: Express) {
  router.post(
    "/users/registration",
    validation(createUserSchema),
    tryCatch(createUserHandler)
  );

  router.put(
    "/users/resend_otp",
    validation(resendOtpSchema),
    tryCatch(resendOtpHandler)
  );

  router.put(
    "/users/password_set",
    validation(resetPasswordSchema),
    tryCatch(setPasswordHandler)
  );

  router.put(
    "/users/otp_verify",
    validation(verifyOtpSchema),
    tryCatch(verifyOtpHandler)
  );

  router.post(
    "/users/login",
    validation(createLoginSchema),
    tryCatch(loginHandler)
  );
};

async function createUserHandler(
  _req: Request<{}, {}, createUserInput["body"]>,
  _res: Record<string, any>
) {
  const response = await createUser(_req.body);

  if (response.data) return _res.apiSuccess(response);
  else return _res.apiDuplicate(response);
}

async function verifyOtpHandler(
  _req: Request<{}, {}, verifyOTPInput["body"]>,
  _res: Record<string, any>
) {
  const response = await verifyOTP(_req.body as any, {
    new: true,
  });

  if (response.data) return _res.apiSuccess(response);
  else return _res.apiDataNotFound(response);
}

async function loginHandler(
  _req: Request<{}, {}, createLoginInput["body"]>,
  _res: Record<string, any>
) {
  const response: any = await createLogin(_req.body);

  if (response.accessToken && response.refreshToken)
    return _res.apiSuccess(response);
  else return _res.apiDuplicate(response);
}

async function resendOtpHandler(
  _req: Request<{}, {}, resendOtpInput["body"]>,
  _res: Record<string, any>
) {
  const response: any = await resendOtp(_req.body as any, { new: true });

  if (response.otp) return _res.apiSuccess(response);
  else return _res.apiDataNotFound(response);
}

async function setPasswordHandler(
  _req: Request<{}, {}, resetPasswordInput["body"]>,
  _res: Record<string, any>
) {
  const response: any = await resetPassword(_req.body as any, {
    new: true,
  });
  if (response.data) return _res.apiSuccess(response);
  else return _res.apiDataNotFound(response);
  // const otpVerify: any = await verifyOTP(_req.body as any, {
  //   new: true,
  // });

  // if (otpVerify) {
  //   const response: any = await resetPassword(_req.body as any, {
  //     new: true,
  //   });
  //   if (response.data) return _res.apiSuccess(response);
  //   else return _res.apiDataNotFound(otpVerify);
  // } else return _res.apiDataNotFound(otpVerify);
}
