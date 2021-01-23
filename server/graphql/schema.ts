import './types';

import { schemaComposer } from 'graphql-compose';

import middleware from '../middleware/authMiddleware';
import FormTC from '../model/form/form.tc';
import SubmissionTC from '../model/submission/submission.tc';
import UserTC from '../model/user/user.tc';
import userValidator from '../model/user/user.validator';

schemaComposer.Query.addFields({
    user: UserTC.getResolver('user', [middleware.isAuth]),
    getForm: FormTC.getResolver('getForm'),
    getMyForms: FormTC.getResolver('getMyForms', [middleware.isAuth]),
    getSubmissions: SubmissionTC.getResolver('getSubmissions', [
        middleware.isAuth
    ])
});

schemaComposer.Mutation.addFields({
    createForm: FormTC.getResolver('createForm', [middleware.isAuth]),
    updateForm: FormTC.getResolver('updateForm', [middleware.isAuth]),
    login: UserTC.getResolver('login', [
        middleware.isGuest,
        userValidator.login
    ]),
    signup: UserTC.getResolver('signup', [
        middleware.isGuest,
        userValidator.signup
    ]),
    logout: UserTC.getResolver('logout', [middleware.isAuth]),
    createSubmission: SubmissionTC.getResolver('createSubmission')
});

const schema = schemaComposer.buildSchema();

export default schema;
