import { Request, Response } from "express";
import { createColumn } from './services/column.service';

module.exports = function (router: { post: (arg0: string, arg1: (req: any, res: any) => any) => void; }) {
    router.post('/columns', createColumnHandler);
};

async function createColumnHandler(
    _req: Request,
    _res: Response
) {
    const column = await createColumn(_req.body);
    return _res.send(column);
};