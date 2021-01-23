export const API_URI =
    process.env.NODE_ENV === 'production'
        ? 'https://textcode.me/graphql'
        : 'http://localhost:4000/graphql';
