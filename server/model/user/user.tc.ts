import { schemaComposer } from 'graphql-compose';
import { composeWithMongoose } from 'graphql-compose-mongoose';

import UserModel from './user.model';
import resolvers from './user.resolver';

const customizationOptions = {
    fields: {
        only: ['_id', 'username']
    }
};

const UserTC = composeWithMongoose(UserModel, customizationOptions);

schemaComposer.createObjectTC({
    name: 'AccessToken',
    fields: { accessToken: 'String!' }
});

for (const resolver in resolvers) {
    UserTC.addResolver(resolvers[resolver]);
}

export default UserTC;
