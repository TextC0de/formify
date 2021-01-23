import { Document, Schema, model } from 'mongoose';

import {
    FormFieldDocument,
    FormFieldSchemaName
} from '../formField/form.field.model';

export const SubmissionFieldSchemaName = 'SubmissionField';

export interface SubmissionFieldDocument extends Document {
    readonly field: FormFieldDocument;
    readonly fieldValue: string;
}

export const SubmissionFieldSchema = new Schema({
    field: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: FormFieldSchemaName
    },
    fieldValue: {
        type: Schema.Types.Mixed,
        default: ''
    }
});

export default model(SubmissionFieldSchemaName, SubmissionFieldSchema);
