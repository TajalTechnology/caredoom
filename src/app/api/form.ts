import validation from "../common/middlewares/validation";
import { NextFunction, Request, Response, Express } from "express";
import { createForm, deleteForm, getForm, getForms, updatedForm } from './services/form.service';
import { CreateFormInput, createFormSchema, deleteFormInput, deleteFormSchema, getFormInput, getFormSchema, updateFormInput, updateFormSchema } from "../schemas/form.schema";

/* try-catch handle */
const tryCatch = (fn: any) => (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);

/* all routes */
module.exports = function (router: Express) {
    router.get('/forms', tryCatch(getFormsHandler));
    router.post('/forms/:formId', validation(createFormSchema), tryCatch(createFormHandler));
    router.get('/forms/:formId', validation(getFormSchema), tryCatch(getFormHandler));
    router.put('/forms/:formId', validation(updateFormSchema), tryCatch(updateFormHandler));
    router.delete('/forms/:formId', validation(deleteFormSchema), tryCatch(deleteFormHandler));
};

/* handler for create a single form data */
async function createFormHandler(_req: Request<{}, {}, CreateFormInput["body"]>, _res: Record<string, any>) {
    var extraColumnsId = _req.params;
    const form = await createForm(_req.body, extraColumnsId);
    return _res.apiSuccess(form);
};

/* handler for get a single form data */
export async function getFormHandler(_req: Request<getFormInput["params"]>, _res: Record<string, any>) {
    console.log(_req.params.formId)
    const formData = await getForm({ _id: _req.params.formId });
    return _res.apiSuccess(formData);
};

/* handler for list of extra columns */
export async function getFormsHandler(_req: Request, _res: Record<string, any>) {
    const list = await getForms();
    return _res.apiSuccess(list);
};

/* handler for update extra columns */
export async function updateFormHandler(_req: Request<updateFormInput["params"]>, _res: Record<string, any>) {
    const updateForm = await updatedForm({ _id: _req.params.formId }, _req.body, { new: true });
    return _res.apiSuccess(updateForm);
};

/* handler for delete extra columns */
export async function deleteFormHandler(_req: Request<deleteFormInput["params"]>, _res: Record<string, any>) {
    const deleteFormData = await deleteForm({ _id: _req.params.formId });
    return _res.apiSuccess(deleteFormData);
};