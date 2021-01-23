import { composeMongoose } from 'graphql-compose-mongoose';

import FormTC from '../form/form.tc';
import SubmissionModel, { SubmissionDocument } from './submission.model';
import resolvers from './submission.resolver';

const customizationOptions = {
    fields: {
        only: ['_id', 'fields']
    }
};

const SubmissionTC = composeMongoose(SubmissionModel, customizationOptions);

for (const resolver in resolvers) {
    SubmissionTC.addResolver(resolvers[resolver]);
}

SubmissionTC.addRelation('form', {
    resolver: () => FormTC.mongooseResolvers.findById(),
    prepareArgs: {
        _id: (source: SubmissionDocument) => source.form
    },
    projection: { form: 1 }
});

export default SubmissionTC;
