import { fieldType } from 'shared/fields';
import { gql } from 'urql';

export interface UpdateFormData {
    updateForm: { succeed: boolean };
}

export interface UpdateFormVariables {
    id: string;
    input: {
        title?: string;
        isLive: boolean;
        fields?: {
            title: string;
            description: string;
            options?: {
                value: string;
            }[];
            required: boolean;
            type: fieldType;
        }[];
    };
}

export const UPDATE_FORM_MUTATION = gql`
    mutation($id: ID!, $input: FormInput!) {
        updateForm(id: $id, input: $input) {
            succeed
        }
    }
`;
