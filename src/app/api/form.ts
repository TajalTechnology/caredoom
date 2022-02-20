import { NextFunction, Request, Response } from "express";
import { createForm, getForm } from './services/form.service';
import { CreateFormInput } from "../schemas/form.schema";

/* try-catch handle */
const use = (fn: any) => (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);

module.exports = function (router: any) {
    router.post('/forms', use(createFormHandler));
    router.get('/forms/:id', getFormHandler);
};

async function createFormHandler(_req: Request<{}, {}, CreateFormInput["body"]>, _res: Record<string, any>) {
    let id = _req.query.id;
    const form = await createForm(_req.body, { id });
    return _res.apiSuccess(form);
};


async function getFormHandler(
    _req: Request,
    _res: Response
) {

    const form = await getForm(_req.params.id);

    return _res.send(form);
};