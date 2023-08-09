import { z, object, TypeOf } from "zod";
import _responce from "../common/utils/res.message";

const userPayload = {
    body: object({
        phnNo: z.string({
            required_error: "Phone number is required",
            invalid_type_error: "Phone number must be a string",
        }),
        username: z.string({
            required_error: "Username is required",
            invalid_type_error: "Username must be a string",
        }),
        password: z.string({
            required_error: "Password is required",
            invalid_type_error: "Password must be a string",
        })
    })
};

/* create user */
export const createUserSchema = object({ ...userPayload });
export type createUserInput = Omit<
    TypeOf<typeof createUserSchema>,
    "body.passwordConfirmation"
>;

/**
 * ***************login schema******************
 */

const loginPayload = {
    body: object({
        password: z.string(),
        phnNo: z.string(),
    })
};

export const createLoginSchema = object({ ...loginPayload });
export type createLoginInput = TypeOf<typeof createLoginSchema>;

