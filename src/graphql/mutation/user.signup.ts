import { gql } from 'urql';

export interface UserSignUpData {
    signup: {
        accessToken: string;
    };
}

export interface UserSignUpVariables {
    username: string;
    password: string;
}

export const USER_SIGNUP_MUTATION = gql`
    mutation($username: String!, $password: String!) {
        signup(username: $username, password: $password) {
            accessToken
        }
    }
`;
