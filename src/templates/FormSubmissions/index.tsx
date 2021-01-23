import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useToasts } from 'react-toast-notifications';
import { useQuery } from 'urql';

import Header from '@src/components/common/Header';
import ViewError from '@src/components/common/ViewError';
import ViewLoading from '@src/components/common/ViewLoading';
import Seo from '@src/components/Seo';
import Container from '@src/components/styled/Container';
import Heading from '@src/components/styled/Heading';
import Label from '@src/components/styled/Label';
import P from '@src/components/styled/P';
import withToken from '@src/components/withToken';
import {
    FORM_QUERY,
    FormQueryData,
    FormQueryVariables
} from '@src/graphql/query/form.query';
import {
    GET_SUBMISSIONS_QUERY,
    GetSubmissionData,
    GetSubmissionVariables
} from '@src/graphql/query/submission.query';
import SubmissionCard from '@src/views/admin/SubmissionCard';

import {
    FormLink,
    FormSubmissionsHeader,
    Stat,
    StatContent,
    StatTitle,
    Stats,
    SubmissionsList,
    Wrapper
} from './styles';

const FormSubmissionsTemplate: NextPage = () => {
    const router = useRouter();
    const { addToast } = useToasts();

    const [result, reexecuteQuery] = useQuery<
        GetSubmissionData,
        GetSubmissionVariables
    >({
        pause: typeof router.query.id === undefined,
        query: GET_SUBMISSIONS_QUERY,
        variables: {
            formId: router.query.id as string
        },
        requestPolicy: 'network-only'
    });

    const [formResult, reexecuteFormQuery] = useQuery<
        FormQueryData,
        FormQueryVariables
    >({
        requestPolicy: 'network-only',
        pause: typeof router.query.id === undefined,
        query: FORM_QUERY,
        variables: {
            id: router.query.id as string
        }
    });

    useEffect(() => {
        reexecuteQuery({ requestPolicy: 'network-only' });
        reexecuteFormQuery({ requestPolicy: 'network-only' });
    }, [router.query.id]);

    const submissions = result.data?.getSubmissions;
    const form = formResult.data?.getForm;

    return (
        <>
            <Seo title={form ? `${form.title} - Formify` : undefined} />

            {(result.fetching || formResult.fetching) && (
                <ViewLoading fullPage />
            )}

            {formResult.error && <ViewError fullPage />}

            {!form?.isLive && (
                <>
                    <Header />
                    <ViewError
                        title="Formulario no publicado"
                        description="Debes publicar el formulario para poder recibir respuestas."
                        buttonText="Editar formulario"
                        buttonHref={`/admin/edit/${router.query.id}`}
                        fullPage
                    />
                </>
            )}

            {submissions && form && form.isLive && (
                <Wrapper>
                    <Header />
                    <FormSubmissionsHeader>
                        <Container>
                            <Label>Link al formulario</Label>
                            <CopyToClipboard
                                text={`${process.env.NEXT_PUBLIC_HOST}/form/${router.query.id}`}
                                onCopy={() => {
                                    addToast('¡Enlace copiado!', {
                                        appearance: 'success'
                                    });
                                }}
                            >
                                <FormLink as="span">
                                    {process.env.NEXT_PUBLIC_HOST}/form/
                                    {router.query.id}
                                </FormLink>
                            </CopyToClipboard>
                            <Stats>
                                <Stat>
                                    <StatContent>
                                        {submissions?.length}
                                    </StatContent>
                                    <StatTitle>Respuestas</StatTitle>
                                </Stat>
                            </Stats>
                        </Container>
                    </FormSubmissionsHeader>

                    <section
                        style={{ padding: '3rem 0', background: '#f7f7f7' }}
                    >
                        <Container>
                            <Heading>Respuestas</Heading>
                            <SubmissionsList>
                                {submissions.length === 0 ? (
                                    <P>Aquí aparecerán las respuestas</P>
                                ) : (
                                    submissions.map((submission) => (
                                        <SubmissionCard
                                            className="FormSubmissions_Submission-Card"
                                            key={submission._id}
                                            fields={form.fields}
                                            submissionFields={submission.fields}
                                        />
                                    ))
                                )}
                            </SubmissionsList>
                        </Container>
                    </section>
                </Wrapper>
            )}
        </>
    );
};

export default withToken(FormSubmissionsTemplate);
