import { graphqlHTTP } from 'express-graphql';

import schema from './schema';

const graphql = graphqlHTTP(async (request: any) => ({
    schema,
    graphiql: true,
    context: {
        user: request.user,
        headers: request.headers,
        accessToken: request.accessToken
    }
}));

export default graphql;
