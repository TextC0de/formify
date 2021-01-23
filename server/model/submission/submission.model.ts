import { Document, Schema, model } from 'mongoose';

import { FormDocument, FormSchemaName } from '../form/form.model';
import {
    SubmissionFieldDocument,
    SubmissionFieldSchema
} from '../submissionField/submission.field';

export const SubmissionSchemaName = 'Submission';

export interface SubmissionDocument extends Document {
    readonly form: FormDocument;
    readonly fields: SubmissionFieldDocument[];
    readonly created: Date;
    readonly lastModified: Date;
}

export const SubmissionSchema = new Schema(
    {
        submision_fields: {
            alias: 'fields',
            type: [SubmissionFieldSchema],
            default: []
        },
        form: {
            type: Schema.Types.ObjectId,
            ref: FormSchemaName,
            required: true
        }
    },
    {
        timestamps: {
            createdAt: 'created',
            updatedAt: 'lastModified'
        }
    }
);

export default model(SubmissionSchemaName, SubmissionSchema);
