import { DocumentDefinition } from 'mongoose';
import FormModel, { FormDocument } from '../../models/form.model';


export async function createForm(
    input: DocumentDefinition<Omit<FormDocument, "createdAt" | "updatedAt">>
) {
    return await FormModel.create(input);
};