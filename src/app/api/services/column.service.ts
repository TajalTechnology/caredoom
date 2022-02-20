import _responce from '../../common/utils/res.message';
import ColumnModel, { ColumnDocument } from '../../models/column.model';
import { DocumentDefinition, FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';


export async function getAllColumns() {
    var responsedata: any = {};
    /* find list & responce */
    const list = await ColumnModel.find();
    return responsedata.list = list;
};

export async function createColumn(input: DocumentDefinition<Omit<ColumnDocument, "createdAt" | "updatedAt">>) {
    /* create columns */
    var responsedata: any = {};
    const column = await ColumnModel.create(input);
    responsedata.columns = column;
    return responsedata;
};

export async function getColumn(query: FilterQuery<ColumnDocument>, options: QueryOptions = { lean: true }) {
    var responsedata: any = {};
    /* find columns & responce */
    const columns = await ColumnModel.findOne(query, {}, options);
    if (!columns) return responsedata.message = _responce.columnEmpty;
    responsedata.columns = columns;
    return responsedata;
};

export async function updatedColumns(query: FilterQuery<ColumnDocument>, update: UpdateQuery<ColumnDocument>, options: QueryOptions) {
    var responsedata: any = {};
    const columns = await ColumnModel.findOneAndUpdate(query, update, options);
    return responsedata.columns = columns;
};

export async function deleteColumns(query: FilterQuery<ColumnDocument>) {
    var responsedata: any = {};
    /* find columns & deleted */
    const columns = await ColumnModel.findByIdAndDelete(query);
    if (!columns) return responsedata.message = _responce.columnEmpty;
    return responsedata.message = _responce.columnDeleted;
};