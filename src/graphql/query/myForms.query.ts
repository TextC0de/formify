import { fieldOption } from 'shared/fields';
import { gql } from 'urql';

export interface MyFormsQueryData {
    getMyForms: {
        _id: string;
        title: string;
        fields: string;
        startPage: fieldOption;
        endPage: boolean;
        isLive: boolean;
    }[];
}

export const MY_FORMS_QUERY = gql`
    query {
        getMyForms {
            _id
            title
            fields {
                _id
                title
            }
            startPage {
                introTitle
            }
            endPage {
                title
            }
            isLive
        }
    }
`;
