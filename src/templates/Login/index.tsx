import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useToasts } from 'react-toast-notifications';
import { useMutation } from 'urql';

import ButtonLoading from '@src/components/ButtonLoading';
import ThemedLayout from '@src/components/common/ThemedLayout';
import Seo from '@src/components/Seo';
import Anchor from '@src/components/styled/Anchor';
import Button from '@src/components/styled/Button';
import Container from '@src/components/styled/Container';
import Heading from '@src/components/styled/Heading';
import Input from '@src/components/styled/Input';
import Span from '@src/components/styled/Span';
import withToken from '@src/components/withToken';
import {
    USER_LOGIN_MUTATION,
    UserLoginData,
    UserLoginVariables
} from '@src/graphql/mutation/user.login';
import { trackLogin } from '@src/utils/analytics';
import { setToken } from '@src/utils/auth';

import { Wrapper } from './styles';

const IllustrationLogin = dynamic(
    () => import('@src/components/icons/IllustrationLogin')
);

type Inputs = {
    username: string;
    password: string;
};

const LoginTemplate: NextPage = () => {
    const router = useRouter();
    const { addToast } = useToasts();
    const { register, handleSubmit, errors } = useForm<Inputs>({
        reValidateMode: 'onSubmit'
    });

    const [result, login] = useMutation<UserLoginData, UserLoginVariables>(
        USER_LOGIN_MUTATION
    );

    const onSubmit = (data: Inputs) => {
        login(data).then((result) => {
            if (result.error) {
                addToast('Ha habido un problema al iniciar sesión', {
                    appearance: 'error'
                });
            } else {
                trackLogin({ method: 'Web' });
                setToken(result.data?.login.accessToken);
                router.push('/admin');
            }
        });
    };

    useEffect(() => {
        if (router.query.denied === 'true') {
            addToast('¡Debes iniciar sesión!', { appearance: 'error' });
        }
    }, [router.query.denied]);

    useEffect(() => {
        if (errors.username) {
            addToast('El nombre de usuario ingresado no es válido', {
                appearance: 'error'
            });
        }

        if (errors.password) {
            addToast('La contraseña ingresada no es válida', {
                appearance: 'error'
            });
        }
    }, [errors.username, errors.password]);

    return (
        <>
            <Seo title="Iniciar sesión - Formify" indexable />

            <main>
                <ThemedLayout Icon={IllustrationLogin}>
                    <Wrapper>
                        <Container>
                            <Heading>Inicia sesión</Heading>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <Input
                                    autoComplete="off"
                                    name="username"
                                    placeholder="Usuario"
                                    ref={register({ required: true })}
                                />

                                <Input
                                    name="password"
                                    type="password"
                                    placeholder="Contraseña"
                                    ref={register({
                                        required: true
                                    })}
                                />

                                {result.fetching ? (
                                    <ButtonLoading />
                                ) : (
                                    <Button
                                        as="input"
                                        type="submit"
                                        value="Iniciar sesión"
                                        block
                                    />
                                )}
                            </form>
                            <Span
                                style={{
                                    marginTop: '1rem',
                                    textAlign: 'center'
                                }}
                                block
                            >
                                ¿Todavia no tienes una cuenta?{' '}
                                <Link href="/signup" passHref>
                                    <Anchor>Crear cuenta</Anchor>
                                </Link>
                            </Span>
                        </Container>
                    </Wrapper>
                </ThemedLayout>
            </main>
        </>
    );
};

export default withToken(LoginTemplate, false);
