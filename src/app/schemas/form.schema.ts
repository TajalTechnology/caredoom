import { object, number, string, TypeOf } from "zod";
import _responce from "../common/utils/res.message";

const payload = {
    body: object({
        username: string({ required_error: _responce.usernameRequired }),
        email: string({ required_error: _responce.emailRequired }),
        password: string({ required_error: _responce.passwordRequired }),
    }),
};

const params = {
    params: object({
        formId: string({ required_error: _responce.formIdRequired }),
    }),
};
const query = {
    query: object({
        id: string({}),
    }),
};

export const createFormSchema = object({ ...payload, ...query });
export type CreateFormInput = TypeOf<typeof createFormSchema>;