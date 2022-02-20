import { NextFunction, Request, Response } from "express";
import { createColumn } from './services/column.service';
import validation from "../common/middlewares/validation";
import { createColumnSchema } from '../schemas/column.schema';
import ColumnModel from "../models/column.model";
import _responce from "../common/utils/res.message";


module.exports = function (router: any) {
    router.post('/columns', validation(createColumnSchema), createColumnHandler);
};

async function createColumnHandler(
    _req: Request,
    _res: Response
) {
    var responsedata = {};

    /* unique form name checker */
    if (_req.body.formName) {
        var formNameDuplicate = await ColumnModel.findOne({ formName: _req.body.formName });
        if (formNameDuplicate) {
            responsedata.message = _responce.formNameDuplicate;
            return _res.apiDuplicate(responsedata);
        };
    };

    const column = await createColumn(_req.body);
    return _res.send(column);
};