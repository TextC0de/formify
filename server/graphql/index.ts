import { graphqlHTTP } from 'express-graphql';

import schema from './schema';

const graphql = graphqlHTTP(async (request: any) => ({
    schema,
    graphiql: process.env.NODE_ENV === 'production' ? false : true,
    context: {
        user: request.user,
        headers: request.headers,
        accessToken: request.accessToken
    }
}));

export default graphql;
