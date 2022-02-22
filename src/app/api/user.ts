import validation from "../common/middlewares/validation";
import { NextFunction, Request, Response, Express } from "express";
import { createUserInput, createUserSchema } from "../schemas/user.schema";
import { createUser } from "./services/user.service";


/* try-catch handle */
const tryCatch = (fn: any) => (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);

/* all routes */
module.exports = function (router: Express) {
    router.post('/users', validation(createUserSchema), tryCatch(createUserHandler));
};


async function createUserHandler(_req: Request<{}, {}, createUserInput["body"]>, _res: Record<string, any>) {
    const user = await createUser(_req.body);
    return _res.apiSuccess({user});
}