import { NextFunction, Request, Response } from "express";
import { createColumn } from './services/column.service';
import validation from "../common/middlewares/validation";
import { createColumnSchema } from '../schemas/column.schema';
import ColumnModel from "../models/column.model";
import _responce from "../common/utils/res.message";

/* try-catch handle */
const use = (fn: any) => (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);

module.exports = function (router: any) {
    router.post('/columns', validation(createColumnSchema), use(createColumnHandler));
};

async function createColumnHandler(_req: Request, _res: Record<string, any>) {
    var responsedata: any = {};

    /* unique form name checker */
    if (_req.body.formName) {
        var formNameDuplicate = await ColumnModel.findOne({ formName: _req.body.formName });
        if (formNameDuplicate) {
            responsedata.message = _responce.formNameDuplicate;
            return _res.apiDuplicate(responsedata);
        };
    };

    /* responce data */
    const column = await createColumn(_req.body);
    return _res.apiSuccess(column);
};