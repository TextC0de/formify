import { schemaComposer } from 'graphql-compose';

schemaComposer.createObjectTC({
    name: 'Succeed',
    fields: { succeed: 'Boolean!' }
});

schemaComposer.createObjectTC({
    name: 'FormInput',
    fields: {
        title: 'String',
        fields: '[FormField]'
    }
});

schemaComposer.createObjectTC({
    name: 'SubmissionInput',
    fields: {
        fields: '[SubmissionField]'
    }
});
