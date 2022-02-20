import { object, string, TypeOf } from "zod";
import _responce from "../common/utils/res.message";

/* validation for body */
const payload = { body: object({ formName: string({ required_error: _responce.formNameRequired }) }) };
export const createColumnSchema = object({ ...payload });
export type createColumnInput = TypeOf<typeof createColumnSchema>;


/* validation for params(columnsId)*/
const params = { params: object({ columnsId: string({ required_error: _responce.columnsIdRequired }) }) };
export const getColumnsSchema = object({ ...params });
export type getColumnsInput = TypeOf<typeof getColumnsSchema>;


/* validation for both body & params(columnsId) */
export const updateColumnSchema = object({ ...payload, ...params });
export type updateColumnInput = TypeOf<typeof updateColumnSchema>;


/* validation params(columnsId) for delete api*/
export const deleteColumnsSchema = object({ ...params });
export type deleteColumnsInput = TypeOf<typeof deleteColumnsSchema>;