import config, { get } from "config";
import { signJwt, verifyJwt } from "../../common/utils/jwt";
import SessionModel from "../../models/session.model";
import { findUser } from "./user.service";


export async function createSession(userId: string, userAgent: string) {
  const session = await SessionModel.create({ user: userId, userAgent });
  return session.toJSON();
};

export async function reIssueAccessToken({
  refreshToken,
}: {
  refreshToken: string;
}) {
  console.log(refreshToken)
  const { decoded } = verifyJwt(refreshToken);

  if (!decoded || !get(decoded, "session")) return false;

  const session = await SessionModel.findById(get(decoded, "session"));

  if (!session || !session.valid) return false;

  const user = await findUser({ _id: session.user });

  if (!user) return false;

  const accessToken = signJwt(
    { ...user, session: session._id },
    { expiresIn: config.get("accessTokenTtl") } // 15 minutes
  );

  return accessToken;
};