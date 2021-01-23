import { gql } from 'urql';

export interface MeQueryData {
    user: {
        username: string;
    };
}

export const ME_QUERY = gql`
    query {
        user {
            username
        }
    }
`;
