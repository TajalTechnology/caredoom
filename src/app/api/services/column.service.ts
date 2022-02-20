import { Request, Response } from "express";
import { DocumentDefinition } from 'mongoose';
import ColumnModel, { ColumnDocument } from '../../models/column.model';
import _responce from '../../common/utils/res.message';

export async function createColumn(input: DocumentDefinition<Omit<ColumnDocument, "createdAt" | "updatedAt">>) {
    /* create columns */
    var responsedata: any = {};
    const column = await ColumnModel.create(input);
    responsedata.column = column;
    return responsedata;
};