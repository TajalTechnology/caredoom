import { Request, Response } from "express";
import { DocumentDefinition } from 'mongoose';
import ColumnModel, { ColumnDocument } from '../../models/column.model';
import _responce from '../../common/utils/res.message';

export async function createColumn(input: DocumentDefinition<Omit<ColumnDocument, "createdAt" | "updatedAt">>) {

    var responsedata = {};
    try {

        /* create columns */
        const column = await ColumnModel.create(input);
        responsedata.column = column;
        return responsedata;
    } catch (error) {
        responsedata.message = 'Error';
        return responsedata;
    }
};