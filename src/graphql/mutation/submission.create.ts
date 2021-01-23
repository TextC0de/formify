import { gql } from 'urql';

export interface CreateSubmissionData {
    createSubmission: {
        _id: string;
    };
}

export interface CreateSubmissionVariables {
    formId: string;
    input: {
        fields: { field: string; fieldValue: string }[];
    };
}

export const CREATE_SUBMISSION_MUTATION = gql`
    mutation($formId: ID!, $input: SubmissionInput!) {
        createSubmission(formId: $formId, input: $input) {
            succeed
        }
    }
`;
