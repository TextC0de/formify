import { gql } from 'urql';

export interface GetSubmissionData {
    getSubmissions: {
        _id: string;
        form: string;
        fields: {
            _id: string;
            field: string;
            fieldValue: string;
        }[];
    }[];
}

export interface GetSubmissionVariables {
    formId: string;
}

export const GET_SUBMISSIONS_QUERY = gql`
    query($formId: ID!) {
        getSubmissions(formId: $formId) {
            _id
            fields {
                field
                fieldValue
                _id
            }
        }
    }
`;
