import { FormState, RegisterOptions } from 'react-hook-form';

import { Textarea, Wrapper } from './styles';

type Props = {
    name?: string;
    register?: any;
    formState?: FormState<any>;
    defaultValue?: string;
    registerOptions: RegisterOptions;
};

const TextareaField: React.FC<
    Props & Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'name'>
> = ({ name, register, defaultValue, registerOptions, ...props }) => (
    <Wrapper>
        <Textarea
            defaultValue={defaultValue}
            autoComplete="off"
            name={name}
            rows={4}
            ref={register(registerOptions)}
            placeholder="Escribe tu respuesta aquí..."
            {...props}
        />
    </Wrapper>
);

export default TextareaField;
