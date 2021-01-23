import { fieldType } from 'shared/fields';
import { gql } from 'urql';

export interface FormFieldData {
    _id: string;
    title: string;
    description: string;
    options?: { value: string }[];
    required: boolean;
    type: fieldType;
}

export interface FormQueryData {
    getForm: {
        title: string;
        isLive: boolean;
        fields: FormFieldData[];
    };
}

export interface FormQueryVariables {
    id: string;
}

export const FORM_QUERY = gql`
    query($id: ID!) {
        getForm(id: $id) {
            title
            fields {
                _id
                title
                description
                required
                type
                options {
                    value
                }
            }
            isLive
        }
    }
`;
