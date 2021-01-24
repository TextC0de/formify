import { Document, Schema, model } from 'mongoose';

import {
    FormFieldDocument,
    FormFieldSchema
} from '../formField/form.field.model';
import { User, UserSchemaName } from '../user/user.model';

export const FormSchemaName = 'Form';

export interface FormPage {
    readonly show: boolean;
    readonly title?: string;
    readonly paragraph?: string;
    readonly buttonText?: string;
}

export interface FormDocument extends Document {
    readonly title: string;
    readonly fields: [FormFieldDocument];
    readonly admin: User;
    readonly startPage: FormPage;
    readonly endPage: FormPage;
    readonly isLive: boolean;
    readonly created: Date;
    readonly lastModified: Date;
}

export const FormSchema = new Schema(
    {
        title: {
            trim: true,
            type: String,
            required: true,
            maxlength: 30
        },
        created: {
            type: Date
        },
        lastModified: {
            type: Date
        },
        isLive: {
            type: Boolean,
            default: false
        },
        form_fields: {
            alias: 'fields',
            type: [FormFieldSchema],
            default: []
        },
        admin: {
            type: Schema.Types.ObjectId,
            ref: UserSchemaName,
            required: true
        },
        startPage: {
            showStart: {
                type: Boolean,
                default: false
            },
            introTitle: {
                type: String,
                default: 'Bienvenido al formulario'
            },
            introParagraph: {
                type: String,
                default: 'Comienza'
            }
        },
        endPage: {
            showEnd: {
                type: Boolean,
                default: false
            },
            title: {
                type: String,
                default: 'Gracias por completar el formulario'
            },
            paragraph: {
                type: String
            },
            buttonText: {
                type: String,
                default: 'Enviar otra respuesta'
            }
        }
    },
    {
        timestamps: {
            createdAt: 'created',
            updatedAt: 'lastModified'
        }
    }
);

export default model(FormSchemaName, FormSchema);
