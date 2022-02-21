import ColumnModel from "../models/column.model";
import _responce from "../common/utils/res.message";
import validation from "../common/middlewares/validation";
import { NextFunction, Request, Response, Express } from "express";
import { createColumn, deleteColumns, getAllColumns, getColumn, updatedColumns } from './services/column.service';
import { createColumnSchema, deleteColumnsInput, deleteColumnSchema, getColumnsInput, getColumnsSchema, updateColumnInput, updateColumnSchema }
    from '../schemas/column.schema';

/* try-catch handle */
export const tryCatch = (fn: any) => (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);

/* all routes */
module.exports = function (router: Express) {
    router.get('/columns', tryCatch(getAllColumnsHandler));
    router.post('/columns', validation(createColumnSchema), tryCatch(createColumnHandler));
    router.get('/columns/:columnsId', validation(getColumnsSchema), tryCatch(getColumnHandler));
    router.put('/columns/:columnsId', validation(updateColumnSchema), tryCatch(updateColumnsHandler));
    router.delete('/columns/:columnsId', validation(deleteColumnSchema), tryCatch(deleteColumnsHandler));
};

/* create columns handler for a single form */
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

/* handler for get extra columns of a single form */
export async function getColumnHandler(_req: Request<getColumnsInput["params"]>, _res: Record<string, any>) {
    const extraColumnsDetails = await getColumn({ _id: _req.params.columnsId });
    return _res.apiSuccess(extraColumnsDetails);
};

/* handler for list of extra columns */
export async function getAllColumnsHandler(_req: Request, _res: Record<string, any>) {
    const extraColumnsList = await getAllColumns();
    return _res.apiSuccess(extraColumnsList);
};

/* handler for update extra columns */
export async function updateColumnsHandler(_req: Request<updateColumnInput["params"]>, _res: Record<string, any>) {
    const updateColumn = await updatedColumns({ _id: _req.params.columnsId }, _req.body, { new: true });
    return _res.apiSuccess(updateColumn);
};

/* handler for delete extra columns */
export async function deleteColumnsHandler(_req: Request<deleteColumnsInput["params"]>, _res: Record<string, any>) {
    const deleteColumn = await deleteColumns({ _id: _req.params.columnsId });
    return _res.apiSuccess(deleteColumn);
};


