import mongoose from "mongoose";

/* interface */
export interface ColumnDocument extends mongoose.Document {
    columnName: string;
    assignment: string;
    dataType: string;
    maxLength: number;
    minLength: number;
    bSearch: boolean;
    bDisplay: boolean;
    bDisabled: boolean;
    evaluationFormula: boolean;
    createdAt:Date,
    updatedAt:Date
};

/* schema */
const columnSchema = new mongoose.Schema(
    {
        formName: { type: String }
        // columnName: { type: String },
        // assignment: { type: String },
        // dataType: {
        //     type: String,
        //     enum: ['string', 'int', 'boolean'],
        // },
        // maxLength: { type: Number },
        // minLength: { type: Number },
        // bSearch: { type: Boolean },
        // bDisplay: { type: Boolean },
        // bDisabled: { type: Boolean },
        // evaluationFormula: { type: Boolean },
    },
    {
        timestamps: true,
        strict: false,
    }
);

const ColumnModel = mongoose.model<ColumnDocument>("Column", columnSchema);
export default ColumnModel;
