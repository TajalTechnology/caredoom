import { DocumentDefinition } from 'mongoose';
import FormModel, { FormDocument } from '../../models/form.model';
import ColumnModel, { ColumnDocument } from '../../models/column.model';

export async function createForm(input: DocumentDefinition<Omit<FormDocument, "createdAt" | "updatedAt">>) {
    let id = "620f435ce91d1ad40150b910";
    const extraColumn = await ColumnModel.findOne({ _id: id }, { createdAt: 0, updatedAt: 0, __v: 0, _id: 0 }).lean();

    var _input: Record<string, any>;
    extraColumn ? _input = { ...input, ...extraColumn } : _input = input;

    /* this loop is for extraColumn validation */
    for (let key in extraColumn) {

        if (input.hasOwnProperty(key)) {
            if (typeof input[key] !== extraColumn[key].dataType) {
                return 'Type does not match';
            }
            if (input[key].length < extraColumn[key].minLength) {
                return 'Minimum length is 4';
            }
            if (input[key].length > extraColumn[key].maxLength) {
                return 'Maximum length is 40';
            }
        }
    };
    return await FormModel.create(input);
};

export async function getForm(id: string) {
    return await ColumnModel.findById({ _id: id });
    // console.log(id);
}


/* Different logic */

    // const extraColumn = await ColumnModel.find();
    // if (extraColumn.length < 1) return 'No column found';
    // const _input: Record<string, any> = { ...input };

    // for (let i = 0; i < extraColumn.length; i++) {
    //     let extraColumnm = extraColumn[i].columnName;
    //     _input[extraColumnm] = "";
    // };
    // console.log(_input)