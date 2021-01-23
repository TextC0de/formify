import { gql } from 'urql';

export interface CreateFormData {
    createForm: {
        _id: string;
    };
}

export interface CreateFormVariables {
    title: string;
}

export const CREATE_FORM_MUTATION = gql`
    mutation($title: String!) {
        createForm(title: $title) {
            _id
        }
    }
`;
