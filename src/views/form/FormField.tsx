import { RegisterOptions, useFormContext } from 'react-hook-form';
import { AddToast } from 'react-toast-notifications';

import formFields from '@src/components/form/types/index';
import InputField from '@src/components/form/types/InputField';
import { FormFieldData } from '@src/graphql/query/form.query';

import {
    Buttons,
    Description,
    Field,
    Header,
    OkButton,
    PrevButton,
    Title,
    Wrapper
} from './styles';
import { fieldIsValid } from './util';

type Props = {
    field: Omit<FormFieldData, '_id'> | undefined;
    name?: string;
    onEnter?: () => void;
    value?: any;
    addToast?: AddToast;
};

const FormField: React.FC<Props> = ({
    addToast,
    value,
    name,
    field,
    onEnter
}) => {
    const methods = useFormContext();

    const FieldInput: React.FC<any> =
        (field && formFields[field.type]) || InputField;

    const onOkClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!field) return;

        const result = fieldIsValid(field, value);
        if (result && onEnter) onEnter();
        if (!result && addToast)
            addToast('El valor del campo no es correcto', {
                appearance: 'error'
            });
    };

    return field ? (
        <Wrapper>
            <Header>
                <Title>
                    {field.title}
                    {field.required ? '*' : undefined}
                </Title>
                <Description>{field.description}</Description>
            </Header>
            <Field>
                {field.type === 'check' ? (
                    <FieldInput
                        {...methods}
                        name={name}
                        registerOptions={
                            {
                                required: field.required
                            } as RegisterOptions
                        }
                        options={field.options}
                        defaultValue={value}
                    />
                ) : (
                    <FieldInput {...methods} name={name} />
                )}
            </Field>
            {name && (
                <Buttons>
                    <PrevButton onClick={onEnter ? onOkClick : undefined}>
                        Anterior
                    </PrevButton>
                    <OkButton onClick={onEnter ? onOkClick : undefined}>
                        Siguiente
                    </OkButton>
                </Buttons>
            )}
        </Wrapper>
    ) : null;
};

export default FormField;
