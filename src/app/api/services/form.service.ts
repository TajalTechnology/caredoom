import { DocumentDefinition } from 'mongoose';
import FormModel, { FormDocument } from '../../models/form.model';
import ColumnModel, { ColumnDocument } from '../../models/column.model';

export async function createForm(input: DocumentDefinition<Omit<FormDocument, "createdAt" | "updatedAt">>) {
    const extraColumn = await ColumnModel.find();
    if (extraColumn.length < 1) return 'No column found';

    const _input: Record<string, any> = { ...input };

    for (let i = 0; i < extraColumn.length; i++) {
        let extraColumnm = extraColumn[i].columnName;
        _input[extraColumnm] = "";
    };
    console.log(_input)

    // return await FormModel.create(input);
};