import { object, number, string, TypeOf } from "zod";
import _responce from "../common/utils/res.message";

const payload = {
    body: object({}),
};

export const createColumnSchema = object({ ...payload });
export type CreateColumnInput = TypeOf<typeof createColumnSchema>;