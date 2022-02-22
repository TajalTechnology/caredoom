import { object, string } from "zod";
import _responce from "../common/utils/res.message";

export const createSessionSchema = object({
    body: object({
        email: string({ required_error: _responce.emailRequired }),
        password: string({ required_error: _responce.passwordRequired }),
    }),
});