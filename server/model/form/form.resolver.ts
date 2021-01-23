import { User } from '../user/user.model';
import FormModel, { FormDocument } from './form.model';

const getUnrepeatedTitle = async (
    title: string,
    user: User
): Promise<string> => {
    const regexp = new RegExp(
        `^(${title.trim()} \#[0-9]+)$|(^${title.trim()}$)`
    );

    const withSameTitle = (
        await FormModel.find({
            admin: user,
            title: regexp
        })
    ).sort((a, b) => (a.title > b.title ? 0 : 1)) as FormDocument[];

    const lastTitleSplitted =
        withSameTitle.length > 0
            ? withSameTitle[withSameTitle.length - 1].title.split('#')
            : [];

    return withSameTitle.length === 0
        ? title
        : `${title} #${
              lastTitleSplitted.length === 2
                  ? parseInt(lastTitleSplitted[1], 10) + 1
                  : withSameTitle.length + 1
          }`;
};

const createForm = {
    name: 'createForm',
    type: 'Form!',
    args: {
        title: 'String!'
    },
    resolve: async ({ args: { title }, context: { user } }) => {
        try {
            const form = await new FormModel({
                title: await getUnrepeatedTitle(title, user),
                admin: user._id
            }).save();

            return form;
        } catch (error) {
            return Promise.reject(error);
        }
    }
};

const updateForm = {
    name: 'updateForm',
    type: 'Succeed!',
    args: {
        id: 'ID!',
        input: 'FormInput!'
    },
    resolve: async ({ args: { id, input }, context: { user } }) => {
        try {
            const form = (await FormModel.findById(id)) as FormDocument;

            if (!form) {
                return Promise.reject(new Error('Form not found.'));
            }

            if (form.admin.toString() !== user._id.toString()) {
                return Promise.reject(
                    new Error("You don't have permissions to edit this form.")
                );
            }

            if (form.isLive) {
                return Promise.reject(
                    new Error(
                        'No se puede actualizar un formulario que ya se ha publicado.'
                    )
                );
            }

            const withSameTitle = await FormModel.findOne({
                title: input.title
            });

            if (withSameTitle && withSameTitle._id.toString() !== id) {
                return Promise.reject(
                    new Error('Ya existe un formulario con el mismo titulo.')
                );
            }

            form.set({
                ...form,
                ...input
            });
            await form.save();

            return {
                succeed: true
            };
        } catch (error) {
            return Promise.reject(error);
        }
    }
};

const getMyForms = {
    name: 'getMyForms',
    type: '[Form]!',
    resolve: async ({ context: { user } }) => {
        try {
            const forms = await FormModel.find({ admin: user._id });
            return forms;
        } catch (error) {
            return Promise.reject(error);
        }
    }
};

const getForm = {
    name: 'getForm',
    type: 'Form!',
    args: {
        id: 'ID!'
    },
    resolve: async ({ args: { id }, context: { user } }) => {
        try {
            const form = await FormModel.findById(id);

            if (!form) {
                return Promise.reject(new Error('Form not found.'));
            }

            if (
                !form.isLive &&
                (!user || form.admin.toString() !== user._id.toString())
            ) {
                return Promise.reject(
                    new Error("You don't have permissions to see this form.")
                );
            }

            return form;
        } catch (error) {
            return Promise.reject(error);
        }
    }
};

export default {
    createForm,
    updateForm,
    getMyForms,
    getForm
};
