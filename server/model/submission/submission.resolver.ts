import FormModel, { FormDocument } from '../form/form.model';
import SubmissionModel, { SubmissionDocument } from './submission.model';

const createSubmission = {
    name: 'createSubmission',
    type: 'Succeed!',
    args: {
        formId: 'ID!',
        input: 'SubmissionInput!'
    },
    resolve: async ({
        args: { formId, input }
    }): Promise<{ succeed: boolean }> => {
        try {
            const form = (await FormModel.findById(formId)) as FormDocument;

            if (!form) {
                return Promise.reject(new Error('Form not found.'));
            }

            await new SubmissionModel({
                fields: input.fields,
                form: form._id
            }).save();

            return {
                succeed: true
            };
        } catch (error) {
            return Promise.reject(error);
        }
    }
};

const getSubmissions = {
    name: 'getSubmissions',
    type: '[Submission]!',
    args: {
        formId: 'ID!'
    },
    resolve: async ({
        args: { formId },
        context: { user }
    }): Promise<SubmissionDocument[]> => {
        try {
            const form = (await FormModel.findById(formId)) as FormDocument;

            if (!form) {
                return Promise.reject(new Error('Form not found.'));
            }

            if (form.admin.toString() !== user._id.toString()) {
                return Promise.reject(new Error("You don't have permissions."));
            }

            const submissions = (await SubmissionModel.find({
                form: form._id
            })) as SubmissionDocument[];

            return submissions;
        } catch (error) {
            return Promise.reject(error);
        }
    }
};

export default {
    createSubmission,
    getSubmissions
};
