import { FormState, RegisterOptions } from 'react-hook-form';

import Input from '@src/components/styled/Input';

type Props = {
    name: string;
    register: any;
    formState: FormState<any>;
    registerOptions?: RegisterOptions;
};

const ControlledInput: React.FC<
    Props & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'name'>
> = ({ name, register, registerOptions, ...props }) => (
    <Input name={name} ref={register(registerOptions)} {...props} />
);

export default ControlledInput;
