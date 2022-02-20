import { NextFunction, Request, Response } from "express";
import { createColumn } from './services/column.service';

const use = (fn: any) => (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);

module.exports = function (router: any) {
    router.post('/columns', use(createColumnHandler));
};

async function createColumnHandler(
    _req: Request,
    _res: Response,
    next: NextFunction,
) {
    const column = await createColumn(_req.body);
    return _res.send(column);
};