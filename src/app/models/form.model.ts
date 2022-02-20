import mongoose from "mongoose";

/* interface */
export interface FormDocument extends mongoose.Document {
    username: string;
    email: string;
    password: string;
};

/* schema */
const formSchema = new mongoose.Schema(
    {
        username: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
    },
    {
        timestamps: true,
        strict: false,
    }
);

const FormModel = mongoose.model<FormDocument>("Form", formSchema);
export default FormModel;
