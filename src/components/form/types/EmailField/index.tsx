import { memo } from 'react';
import { FormState, RegisterOptions } from 'react-hook-form';

import { Input, Wrapper } from './styles';

type Props = {
    register?: any;
    formState?: FormState<any>;
    registerOptions: RegisterOptions;
    defaultValue?: string;
};

const EmailField = memo<Props & React.InputHTMLAttributes<HTMLInputElement>>(
    ({ name, register, defaultValue, registerOptions, ...props }) => (
        <Wrapper>
            <Input
                name={name}
                placeholder="Correo electrónico"
                type="email"
                ref={register(registerOptions)}
                defaultValue={defaultValue}
                {...props}
            />
        </Wrapper>
    ),
    (prevProps, nextProps) =>
        !!prevProps.formState &&
        !!nextProps.formState &&
        prevProps.formState.isDirty === nextProps.formState.isDirty
);

export default EmailField;
