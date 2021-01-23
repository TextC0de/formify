import { gql } from 'urql';

export interface UserLoginData {
    login: {
        accessToken: string;
    };
}

export interface UserLoginVariables {
    username: string;
    password: string;
}

export const USER_LOGIN_MUTATION = gql`
    mutation($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            accessToken
        }
    }
`;
