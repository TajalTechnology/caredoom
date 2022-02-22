import { object, string, TypeOf } from "zod";
import _responce from "../common/utils/res.message";

const payload = {
    body: object({
        name: string({ required_error: _responce.nameRequired }),
        password: string({ required_error: _responce.passwordRequired }).min(6, _responce.passwordLength),
        passwordConfirmation: string({ required_error: _responce.passwordConformationRequired }),
        email: string({ required_error: _responce.emailRequired }).email(_responce.validaEmail),
    }).refine((data) => data.password === data.passwordConfirmation, {
        message: _responce.passwordNotMatch,
        path: ["passwordConfirmation"],
    }),
};


/* create user */
export const createUserSchema = object({ ...payload });
export type createUserInput = Omit<TypeOf<typeof createUserSchema>, "body.passwordConfirmation">;
