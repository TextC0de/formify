import { FormState, RegisterOptions } from 'react-hook-form';

import { Input, Wrapper } from './styles';

type Props = {
    name?: string;
    register?: any;
    formState?: FormState<any>;
    registerOptions: RegisterOptions;
    defaultValue?: string;
};

const TextField: React.FC<
    Props & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'name'>
> = ({ name, register, defaultValue, registerOptions, ...props }) => (
    <Wrapper>
        <Input
            defaultValue={defaultValue}
            autoComplete="off"
            name={name}
            placeholder="Escribe tu respuesta aquí..."
            ref={register(registerOptions)}
            {...props}
        />
    </Wrapper>
);

export default TextField;
