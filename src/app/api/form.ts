import { Request, Response } from "express";
import { createForm, getForm } from './services/form.service';

module.exports = function (router: any) {
    router.post('/forms', createFormHandler);
    router.get('/forms/:id', getFormHandler);
};

async function createFormHandler(
    _req: Request,
    _res: Response
) {
    const form = await createForm(_req.body);
    return _res.send(form);
};


async function getFormHandler(
    _req: Request,
    _res: Response
) {

    const form = await getForm(_req.params.id);

    return _res.send(form);
};