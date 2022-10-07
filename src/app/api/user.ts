import validation from "../common/middlewares/validation";
import { NextFunction, Request, Response, Express } from "express";
import {
  createUserInput,
  createUserSchema,
  updateOtpSchema,
  updateOtpInput,
} from "../schemas/user.schema";
import { createUser, updateOTP } from "./services/user.service";

/* try-catch handle */
const tryCatch =
  (fn: any) => (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);

/* all routes */
module.exports = function (router: Express) {
  router.post(
    "/users",
    validation(createUserSchema),
    tryCatch(createUserHandler)
  );
  router.put(
    "/users/otp_verify",
    validation(updateOtpSchema),
    tryCatch(otpHandler)
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

async function otpHandler(
  _req: Request<{}, {}, updateOtpInput["body"]>,
  _res: Record<string, any>
) {
  const response = await updateOTP(_req.body as any, {
    new: true,
  });

  if (response.data) return _res.apiSuccess(response);
  else return _res.apiDataNotFound(response);
}
