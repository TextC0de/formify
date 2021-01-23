import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useToasts } from 'react-toast-notifications';
import { useMutation } from 'urql';

import ButtonLoading from '@src/components/ButtonLoading';
import Seo from '@src/components/Seo';
import Button from '@src/components/styled/Button';
import Container from '@src/components/styled/Container';
import Heading from '@src/components/styled/Heading';
import Input from '@src/components/styled/Input';
import P from '@src/components/styled/P';
import withToken from '@src/components/withToken';
import {
    CREATE_FORM_MUTATION,
    CreateFormData,
    CreateFormVariables
} from '@src/graphql/mutation/form.create';

import { Wrapper } from './styles';

type Inputs = {
    title: string;
};

const NewForm: NextPage = () => {
    const router = useRouter();
    const { addToast } = useToasts();
    const { register, handleSubmit, errors } = useForm<Inputs>();

    const [result, createForm] = useMutation<
        CreateFormData,
        CreateFormVariables
    >(CREATE_FORM_MUTATION);

    const onSubmit = (data: Inputs) => {
        createForm(data).then((result) => {
            if (result.error) {
                addToast('Ha habido un error al crear tu formulario', {
                    appearance: 'error'
                });
            } else {
                router.push(`/admin/edit/${result.data?.createForm._id}`);
            }
        });
    };

    useEffect(() => {
        if (errors.title) {
            addToast('El título ingresado no es válido', {
                appearance: 'error'
            });
        }
    }, [errors.title]);

    return (
        <>
            <Seo
                title="Crear formulario - Formify"
                description="Crea un formulario"
            />
            <Wrapper>
                <Container>
                    <Heading style={{ marginBottom: '0' }}>
                        Crea un formulario
                    </Heading>
                    <P style={{ marginBottom: '1.5rem' }}>
                        Por favor, ingresa el titulo de tu nuevo formulario
                    </P>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Input
                            name="title"
                            placeholder="Título"
                            ref={register({ required: true })}
                        />

                        {result.fetching ? (
                            <ButtonLoading />
                        ) : (
                            <Button
                                as="input"
                                type="submit"
                                value="Crear formulario"
                                block
                            />
                        )}
                    </form>
                </Container>
            </Wrapper>
        </>
    );
};

export default withToken(NewForm);
