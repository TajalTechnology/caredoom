import validation from "../common/middlewares/validation";
import { NextFunction, Request, Response, Express } from "express";
import {
    createUserInput,
    createUserSchema,
    createLoginSchema,
    createLoginInput
} from "../schemas/user.schema";
import {
    createLogin,
    createUser
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
    const user = await createUser(_req.body);
    if(user._id) return _res.apiSuccess();
    else return _res.apiDuplicate('User already exists');
}

async function loginHandler(
    _req: Request<{}, {}, createLoginInput["body"]>,
    _res: Record<string, any>
) {
    return _res.apiSuccess(await createLogin(_req.body));
}

