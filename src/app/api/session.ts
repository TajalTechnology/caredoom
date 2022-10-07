import validation from "../common/middlewares/validation";
import { NextFunction, Request, Response, Express } from "express";
import {
  createSessionInput,
  createSessionSchema,
} from "../schemas/session.schema";
import { validatePassword } from "./services/user.service";
import { signJwt } from "../common/utils/jwt";
import config from "config";
import { createSession } from "./services/session.service";
import _responce from "../common/utils/res.message";

/* try-catch handle */
const tryCatch =
  (fn: any) => (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);

/* all routes */
module.exports = function (router: Express) {
  router.post(
    "/sessions",
    validation(createSessionSchema),
    tryCatch(createSessionHandler)
  );
};

async function createSessionHandler(
  _req: Request<{}, {}, createSessionInput["body"]>,
  _res: Record<string, any>
) {
  // Validate the user's password & create session
  const user = await validatePassword(_req.body as any);
  if (!user) return _res.status(401).send(_responce.invalidUsernamePassword);
  const session = await createSession(user._id, _req.get("user-agent") || "");

  // create an access token
  const accessToken = signJwt(
    { ...user, session: session._id },
    { expiresIn: config.get("accessTokenTtl") } // 15 minutes
  );

  // create a refresh token
  const refreshToken = signJwt(
    { ...user, session: session._id },
    { expiresIn: config.get("refreshTokenTtl") } // 15 minutes
  );

  const tokens: any = { accessToken, refreshToken };

  // return access & refresh tokens
  return _res.apiSuccess(tokens);
}
