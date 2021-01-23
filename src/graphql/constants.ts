export const API_URI =
    process.env.NODE_ENV === 'production'
        ? ''
        : 'http://localhost:4000/graphql';
