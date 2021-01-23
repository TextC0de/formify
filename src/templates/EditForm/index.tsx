import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { useToasts } from 'react-toast-notifications';
import { fieldType } from 'shared/fields';
import { useMutation, useQuery } from 'urql';

import Header from '@src/components/common/Header';
import ViewError from '@src/components/common/ViewError';
import ViewLoading from '@src/components/common/ViewLoading';
import IconAdd from '@src/components/icons/IconAdd';
import IconBin from '@src/components/icons/IconBin';
import Seo from '@src/components/Seo';
import Container from '@src/components/styled/Container';
import Heading from '@src/components/styled/Heading';
import Input from '@src/components/styled/Input';
import Label from '@src/components/styled/Label';
import withToken from '@src/components/withToken';
import {
    UPDATE_FORM_MUTATION,
    UpdateFormData,
    UpdateFormVariables
} from '@src/graphql/mutation/form.update';
import {
    FORM_QUERY,
    FormQueryData,
    FormQueryVariables
} from '@src/graphql/query/form.query';
import { trackException } from '@src/utils/analytics';
import EditableFormField from '@src/views/admin/EditableFormField';
import EditFormHeader from '@src/views/admin/EditFormHeader';
import FormField from '@src/views/form/FormField';

import {
    AddField,
    Content,
    EditableView,
    Field,
    FieldDivider,
    FieldHeader,
    PreviewView,
    Wrapper
} from './styles';

const defaultField = {
    title: '',
    description: '',
    required: true,
    type: 'input' as fieldType
};

type FormInput = Omit<UpdateFormVariables['input'], 'isLive'>;

const EditFormTemplate: NextPage = () => {
    const router = useRouter();
    const { addToast } = useToasts();

    const [result, reexecuteQuery] = useQuery<
        FormQueryData,
        FormQueryVariables
    >({
        pause: typeof router.query.id === undefined,
        query: FORM_QUERY,
        variables: {
            id: router.query.id as string
        }
    });

    const [, updateForm] = useMutation<UpdateFormData, UpdateFormVariables>(
        UPDATE_FORM_MUTATION
    );

    const methods = useForm<FormInput>({
        defaultValues: {
            title: '',
            fields: [defaultField]
        }
    });

    const { watch, reset, control, register, handleSubmit } = methods;

    const { fields, remove, append } = useFieldArray({
        name: 'fields',
        control
    });

    const watched = watch('fields');

    useEffect(() => {
        reexecuteQuery();
    }, [router.query.id]);

    useEffect(() => {
        const formFields = result.data?.getForm.fields;
        if (formFields) {
            reset({
                title: result.data?.getForm.title,
                fields: formFields.length > 0 ? formFields : [defaultField]
            });
        }
    }, [result.data?.getForm?.fields, reset]);

    const saveForm = (publish: boolean) => (data: FormInput) => {
        updateForm({
            id: router.query.id as string,
            input: {
                title: data.title,
                isLive: publish,
                fields: data.fields
            }
        }).then((result) => {
            if (result.error) {
                trackException({
                    description: `saveForm: ${result.error}`,
                    fatal: false
                });
                console.error(result.error);
            } else {
                addToast('El formulario ha sido guardado con exito', {
                    appearance: 'success'
                });
                if (!publish) return;

                router.push(`/admin/submissions/${router.query.id}`);
            }
        });
    };

    const removeField = (index: number) => (
        e: React.MouseEvent<HTMLOrSVGElement>
    ) => {
        e.preventDefault();
        remove(index);
    };

    const addField = (e: React.MouseEvent<HTMLOrSVGElement>) => {
        e.preventDefault();
        append(defaultField);
    };

    const form = result.data?.getForm;

    return (
        <>
            <Seo title={form ? `${form?.title} - Formify` : undefined} />

            {result.fetching && <ViewLoading fullPage />}
            {result.error && <ViewError fullPage />}

            {result.data?.getForm && result.data?.getForm.isLive && (
                <>
                    <Header />
                    <ViewError
                        title="No puedes editar este formulario"
                        description="Lo siento, este formulario ya ha sido publicado y no podrás seguir editandolo."
                        buttonText="Ver respuestas"
                        buttonHref={`/admin/submissions/${router.query.id}`}
                        fullPage
                    />
                </>
            )}

            {result.data?.getForm && !result.data?.getForm.isLive && (
                <Wrapper>
                    <EditFormHeader
                        onSaveClick={handleSubmit(saveForm(false))}
                        onPublishClick={handleSubmit(saveForm(true))}
                    />
                    <Container>
                        <Content>
                            <form>
                                <Label>Título*</Label>
                                <Input
                                    name="title"
                                    ref={register()}
                                    defaultValue={form?.title}
                                    style={{ marginBottom: '3rem' }}
                                />

                                <Heading>Preguntas</Heading>
                                <FormProvider {...methods}>
                                    {fields
                                        .filter((field) => field)
                                        .map((field, index) => (
                                            <div key={field.id}>
                                                <FieldHeader>
                                                    <Heading level={3}>
                                                        Pregunta {index + 1}
                                                    </Heading>
                                                    <IconBin
                                                        onClick={removeField(
                                                            index
                                                        )}
                                                    />
                                                </FieldHeader>
                                                <Field>
                                                    <EditableView>
                                                        <EditableFormField
                                                            name={`fields[${index}]`}
                                                            field={field}
                                                            isCheck={
                                                                watched
                                                                    ? watched[
                                                                          index
                                                                      ].type ===
                                                                      'check'
                                                                    : false
                                                            }
                                                        />
                                                    </EditableView>
                                                    <PreviewView>
                                                        <Heading level={6}>
                                                            Vista previa
                                                        </Heading>
                                                        <FormField
                                                            field={
                                                                watched
                                                                    ? watched[
                                                                          index
                                                                      ]
                                                                    : undefined
                                                            }
                                                        />
                                                    </PreviewView>
                                                </Field>
                                                <FieldDivider />
                                            </div>
                                        ))}
                                </FormProvider>
                                <AddField>
                                    <IconAdd onClick={addField} />
                                </AddField>
                            </form>
                        </Content>
                    </Container>
                </Wrapper>
            )}
        </>
    );
};

export default withToken(EditFormTemplate);
