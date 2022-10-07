import { z, object, string, ZodIssueCode, TypeOf } from "zod";
import _responce from "../common/utils/res.message";

const sessionPayload = {
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

export const createSessionSchema = object({ ...sessionPayload });
export type createSessionInput = TypeOf<typeof createSessionSchema>;
