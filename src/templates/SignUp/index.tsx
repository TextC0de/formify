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
import P from '@src/components/styled/P';
import Span from '@src/components/styled/Span';
import withToken from '@src/components/withToken';
import {
    USER_SIGNUP_MUTATION,
    UserSignUpData,
    UserSignUpVariables
} from '@src/graphql/mutation/user.signup';
import { trackSignup } from '@src/utils/analytics';
import { setToken } from '@src/utils/auth';

import { Wrapper } from './styles';

const IllustrationSignUp = dynamic(
    () => import('@src/components/icons/IllustrationSignUp')
);

type Inputs = {
    username: string;
    password: string;
};

const SignUpTemplate: NextPage = () => {
    const router = useRouter();
    const { addToast } = useToasts();
    const { register, handleSubmit, errors, clearErrors } = useForm<Inputs>({
        reValidateMode: 'onSubmit'
    });

    const [result, signup] = useMutation<UserSignUpData, UserSignUpVariables>(
        USER_SIGNUP_MUTATION
    );

    const onSubmit = (data: Inputs) => {
        signup(data).then((result) => {
            if (result.error) {
                addToast(
                    result.error.message.toString() ===
                        '[GraphQL] Username has already been taken.'
                        ? 'El nombre de usuario ya se encuentra ocupado'
                        : 'Ha habido un error al crear tu cuenta',
                    {
                        appearance: 'error'
                    }
                );
            } else {
                trackSignup({ method: 'Web' });
                setToken(result.data?.signup.accessToken);
                router.push('/admin');
            }
        });
    };

    useEffect(() => {
        if (errors.username) {
            addToast('El nombre de usuario ingresado no es válido', {
                appearance: 'error'
            });
            clearErrors('username');
        }

        if (errors.password) {
            addToast('La contraseña ingresada no es válida', {
                appearance: 'error'
            });
            clearErrors('password');
        }
    }, [errors.username, errors.password]);

    return (
        <>
            <Seo
                title="Crear cuenta - Formify"
                description="Crea una cuenta y crea formularios"
                indexable
            />

            <main>
                <ThemedLayout Icon={IllustrationSignUp}>
                    <Wrapper>
                        <Container>
                            <Heading>Registrate</Heading>
                            <P>
                                Estas a un paso de crear geniales encuestas en
                                cuestión de segundos
                            </P>
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
                                        required: true,
                                        minLength: 8
                                    })}
                                />
                                <span
                                    style={{
                                        marginBottom: '1.5rem',
                                        display: 'block'
                                    }}
                                >
                                    <small>
                                        La contraseña debe de tener al menos 8
                                        caracteres
                                    </small>
                                </span>
                                {result.fetching ? (
                                    <ButtonLoading />
                                ) : (
                                    <Button
                                        as="input"
                                        type="submit"
                                        value="Crear mi cuenta"
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
                                ¿Ya tienes una cuenta?{' '}
                                <Link href="/login" passHref>
                                    <Anchor>Inicia sesión</Anchor>
                                </Link>
                            </Span>
                        </Container>
                    </Wrapper>
                </ThemedLayout>
            </main>
        </>
    );
};

export default withToken(SignUpTemplate, false);
