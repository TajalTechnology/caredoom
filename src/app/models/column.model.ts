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
};

/* schema */
const columnSchema = new mongoose.Schema(
    {
        columnName: { type: String, required: true },
        assignment: { type: String },
        dataType: {
            type: String,
            enum: ['string', 'int', 'boolean'],
        },
        maxLength: { type: Number },
        minLength: { type: Number },
        bSearch: { type: Boolean },
        bDisplay: { type: Boolean },
        bDisabled: { type: Boolean },
        evaluationFormula: { type: Boolean },
    },
    {
        timestamps: true,
        strict: true,
    }
);

const ColumnModel = mongoose.model<ColumnDocument>("Column", columnSchema);
export default ColumnModel;
