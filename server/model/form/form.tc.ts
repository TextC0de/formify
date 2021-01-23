import { composeMongoose } from 'graphql-compose-mongoose';

import FormModel from './form.model';
import resolvers from './form.resolver';

const customizationOptions = {
    fields: {
        only: ['_id', 'title', 'fields', 'startPage', 'endPage', 'isLive']
    }
};

const FormTC = composeMongoose(FormModel, customizationOptions);

for (const resolver in resolvers) {
    FormTC.addResolver(resolvers[resolver]);
}

export default FormTC;
