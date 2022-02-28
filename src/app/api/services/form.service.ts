import {FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
import FormModel, { FormDocument, formSchema } from '../../models/form.model';
import ColumnModel, { ColumnDocument } from '../../models/column.model';
import _responce from '../../common/utils/res.message';


export async function createForm(input:Record<string, any>, query: FilterQuery<ColumnDocument> ) {
    var _input: Record<string, any> = {};
    // @ts-ignore
    const formFields:any = formSchema.tree;
    var responsedata: any = {};

    /* recive only formSchema fields */
    for (let key in formFields) {if(input.hasOwnProperty(key))_input[key] = input[key]};

    var extraColumn:Record<string, any> = await ColumnModel.findOne({ _id: query.formId }, { createdAt: 0, updatedAt: 0, __v: 0, _id: 0 }).lean();
    if (!extraColumn) return responsedata.message = _responce.noColumnsFound;
    let extraAllColumnName:any = {};

    /* add if has extra columns fields */
    if (query.formId) {
        /* extraColumn validation check */
        for (let key in extraColumn) {
            extraAllColumnName[key] =key;
            
            if (input.hasOwnProperty(key)) {
                var validationMessage:Record<string, any> = {};
                
                if (typeof input[key] !== extraColumn[key].dataType) validationMessage.type = `${key} ${_responce.Typematch}`;
                if (input[key].length < extraColumn[key].minLength) validationMessage.minLength= `${key} ${_responce.columMinLength} ${extraColumn[key].minLength}`;
                if (input[key].length > extraColumn[key].maxLength) validationMessage.maxLength= `${key} ${_responce.columnMaxLength} ${extraColumn[key].maxLength}`;

                if(Object.keys(validationMessage).length === 0){ _input[key] = input[key];
                }else{return validationMessage};
            };
        }; 
    };

    //check if all extra column fill up or not?
    for (let key in extraAllColumnName) {
        if(_input.hasOwnProperty(key) || key==='formName'){
            console.log('True')
        }else{return responsedata.message = `${key} ${_responce.enterColumnInfo}` }
    };
    return await FormModel.create(_input);
};

export async function getForm(query: FilterQuery<FormDocument>, options: QueryOptions = { lean: true }) {
    var responsedata: any = {};
    const formData = await FormModel.findOne(query, {}, options);
    if (!formData) return responsedata.message = _responce.noDataFound;
    return responsedata.formData = formData;
};

export async function getForms() {
    var responsedata: any = {};
    /* find list & responce */
    const list = await FormModel.find();
    return responsedata.list = list;
};

export async function updatedForm(query: FilterQuery<FormDocument>, update: UpdateQuery<FormDocument>, options: QueryOptions) {
    var responsedata: any = {};
    const form = await FormModel.findOneAndUpdate(query, update, options);
    return responsedata.form = form;
};

export async function deleteForm(query: FilterQuery<FormDocument>) {
    var responsedata: any = {};
    /* find columns & deleted */
    const formData = await FormModel.findByIdAndDelete(query);
    if (!formData) return responsedata.message = _responce.noDataFound;
    return responsedata.message = _responce.formDataDeleted;
};

















    // var _input: Record<string, any>;
    // extraColumn ? _input = { ...input, ...extraColumn } : _input = input;
    
/* Different logic */

    // const extraColumn = await ColumnModel.find();
    // if (extraColumn.length < 1) return 'No column found';
    // const _input: Record<string, any> = { ...input };

    // for (let i = 0; i < extraColumn.length; i++) {
    //     let extraColumnm = extraColumn[i].columnName;
    //     _input[extraColumnm] = "";
    // };
    // console.log(_input)