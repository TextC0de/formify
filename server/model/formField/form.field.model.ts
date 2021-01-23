import { Document, Schema, model } from 'mongoose';

import { fieldType, fieldTypes } from '../../../shared/fields';

export const FormFieldSchemaName = 'FormField';
export interface FormFieldDocument extends Document {
    title: string;
    description: string;
    options?: string[];
    required: boolean;
    disabled: boolean;
    type: fieldType;
}

export const FormFieldSchema = new Schema({
    title: {
        type: String,
        trim: true
    },
    description: {
        type: String,
        default: ''
    },
    fieldOptions: {
        alias: 'options',
        type: [
            {
                value: String
            }
        ]
    },
    required: {
        type: Boolean,
        default: true
    },
    disabled: {
        type: Boolean,
        default: false
    },
    fieldType: {
        alias: 'type',
        type: String,
        enum: fieldTypes
    }
});

export default model(FormFieldSchemaName, FormFieldSchema);
