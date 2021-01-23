import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { SwiperInstance } from 'react-id-swiper';
import { useToasts } from 'react-toast-notifications';
import { useMutation, useQuery } from 'urql';

import ProgressBar from '@src/components/common/ProgressBar';
import ViewError from '@src/components/common/ViewError';
import ViewLoading from '@src/components/common/ViewLoading';
import Seo from '@src/components/Seo';
import Container from '@src/components/styled/Container';
import Heading from '@src/components/styled/Heading';
import type { SwiperRefType } from '@src/components/SwiperCustom';
import {
    CREATE_SUBMISSION_MUTATION,
    CreateSubmissionData,
    CreateSubmissionVariables
} from '@src/graphql/mutation/submission.create';
import {
    FORM_QUERY,
    FormQueryData,
    FormQueryVariables
} from '@src/graphql/query/form.query';
import { trackException } from '@src/utils/analytics';
import { getFormWasSubmited, setFormAsSubmited } from '@src/utils/form';
import FormField from '@src/views/form/FormField';

import { Slide, StartEndSlide, StartEndTitle, Wrapper } from './styles';

const SwiperCustom = dynamic(() => import('@src/components/SwiperCustom'), {
    loading: () => <ViewLoading />,
    ssr: false
});

type FormInput = {
    fields: { field: string; fieldValue: string }[];
};

const FormTemplate: NextPage = () => {
    const router = useRouter();
    const { addToast } = useToasts();
    const [formWasSaved, setFormWasSaved] = useState<boolean>(false);
    const [activeIndex, setActiveIndex] = useState<number>(0);

    const swiperRef = useRef<SwiperRefType>(null);

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

    const [, createSubmission] = useMutation<
        CreateSubmissionData,
        CreateSubmissionVariables
    >(CREATE_SUBMISSION_MUTATION);

    const methods = useForm<FormInput>({
        defaultValues: {
            fields: []
        }
    });

    const { reset, control, handleSubmit } = methods;

    const { fields } = useFieldArray({
        name: 'fields',
        control
    });

    useEffect(() => {
        const listener = (e: any) => {
            // Horrible para accesbilidad solo por ahora
            if (e.code === 'Tab') {
                e.preventDefault();
            }
        };
        addEventListener('keydown', listener);

        return () => {
            removeEventListener('keydown', listener);
        };
    }, []);

    useEffect(() => {
        reexecuteQuery();
        reset({ fields: [] });
    }, [router.query.id]);

    useEffect(() => {
        if (result.data?.getForm?.fields) {
            reset({
                fields: result.data.getForm.fields.map((formField) => ({
                    field: formField._id
                }))
            });
        }
    }, [result.data?.getForm?.fields, reset]);

    const submit = (data: FormInput) => {
        createSubmission({
            formId: router.query.id as string,
            input: data
        }).then((result) => {
            if (result.error) {
                trackException({
                    description: `Error create submission: ${result.error}`,
                    fatal: false
                });

                console.error(result.error);
                return;
            }

            setFormAsSubmited(router.query.id as string);
            setFormWasSaved(true);
        });
    };

    const goPrev = () => {
        if (swiperRef.current && swiperRef.current.swiper) {
            swiperRef.current.swiper.slidePrev();
        }
    };

    const goNext = () => {
        if (swiperRef.current && swiperRef.current.swiper) {
            if (
                swiperRef.current.swiper.activeIndex ===
                (result.data?.getForm?.fields?.length || 0) - 1
            ) {
                handleSubmit(submit)();
                return;
            }

            // this works i dont know why
            // if you remove this line the form will not slide correctly
            swiperRef.current.swiper.update();

            swiperRef.current.swiper.slideNext();
        }
    };

    const HorizontalSwiperParams = {
        spaceBetween: 30,
        on: {
            slideChange: (swiper: SwiperInstance): void => {
                if (swiper === null) return;
                setActiveIndex(swiper.activeIndex);
            }
        }
    };

    const form = result.data?.getForm;
    const watched = methods.watch('fields');
    const formWasSubmited = getFormWasSubmited(router.query.id as string);

    return (
        <>
            <Seo title={form ? form.title : undefined} />
            {result.fetching && <ViewLoading fullPage />}
            {result.error && <ViewError fullPage />}
            {(formWasSubmited || formWasSaved) && (
                <StartEndSlide>
                    <Container>
                        <StartEndTitle>
                            ¡Gracias por completar este formulario!
                        </StartEndTitle>
                    </Container>
                </StartEndSlide>
            )}
            {form && !formWasSubmited && (
                <Wrapper>
                    <Container>
                        <Heading level={6}>
                            Pregunta {activeIndex + 1} de {fields.length}
                        </Heading>

                        <form>
                            <FormProvider {...methods}>
                                <SwiperCustom
                                    direction="horizontal"
                                    myRef={swiperRef}
                                    params={HorizontalSwiperParams}
                                >
                                    {fields.map((field, index) => (
                                        <Slide key={field.id}>
                                            <input
                                                ref={methods.register({
                                                    required: true
                                                })}
                                                name={`fields[${index}].field`}
                                                style={{ display: 'none' }}
                                                defaultValue={field.field}
                                            />
                                            <FormField
                                                addToast={addToast}
                                                name={`fields[${index}].fieldValue`}
                                                field={
                                                    result.data?.getForm.fields[
                                                        index
                                                    ]
                                                }
                                                value={
                                                    watched
                                                        ? (watched[index] || {})
                                                              .fieldValue
                                                        : undefined
                                                }
                                                goPrev={goPrev}
                                                onEnter={goNext}
                                            />
                                        </Slide>
                                    ))}
                                </SwiperCustom>
                            </FormProvider>
                        </form>
                        <ProgressBar
                            colors={{
                                zero: '#ddd',
                                started: '#333',
                                full: '#333'
                            }}
                            progress={
                                (watched.filter(({ fieldValue }) => fieldValue)
                                    .length /
                                    fields.length) *
                                100
                            }
                        />
                    </Container>
                </Wrapper>
            )}
        </>
    );
};

export default FormTemplate;
