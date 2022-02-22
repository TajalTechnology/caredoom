import { object, number, string, TypeOf } from "zod";
import _responce from "../common/utils/res.message";

/* validation for body */
const payload = {
    body: object({
        username: string({ required_error: _responce.usernameRequired }),
        email: string({ required_error: _responce.emailRequired }),
        password: string({ required_error: _responce.passwordRequired }),
    }),
};
// const query = { query: object({ id: string({}) }) };
const params = { params: object({ formId: string({ required_error: _responce.formIdRequired }) }) };

export const createFormSchema = object({ ...payload, ...params });
export type CreateFormInput = TypeOf<typeof createFormSchema>;


/* validation for params(formId)*/
export const getFormSchema = object({ ...params });
export type getFormInput = TypeOf<typeof getFormSchema>;


/* validation for both body & params(formId) */
export const updateFormSchema = object({ ...payload, ...params });
export type updateFormInput = TypeOf<typeof updateFormSchema>;

/* validation params(columnsId) for delete api*/
export const deleteFormSchema = object({ ...params });
export type deleteFormInput = TypeOf<typeof deleteFormSchema>;
