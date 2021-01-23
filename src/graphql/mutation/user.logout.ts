import { gql } from 'urql';

export const USER_LOGOUT_MUTATION = gql`
    mutation {
        logout {
            succeed
        }
    }
`;
