import { DocumentDefinition } from 'mongoose';
import ColumnModel, { ColumnDocument } from '../../models/column.model';

export async function createColumn(
    input: DocumentDefinition<Omit<ColumnDocument, "createdAt" | "updatedAt">>
) {
    // try {
    return await ColumnModel.create(input);
    // } catch (error) {
    //     console.log('Error occured')
    // }
};