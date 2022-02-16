import { Request, Response } from "express";
import { createForm } from './services/form.service';

module.exports = function (router: { post: (arg0: string, arg1: (req: any, res: any) => any) => void; }) {
    router.post('/forms', createFormHandler);
};

async function createFormHandler(
    _req: Request,
    _res: Response
) {
    const form = await createForm(_req.body);
    return _res.send(form);
};