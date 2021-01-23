import 'react-datepicker/dist/react-datepicker.css';

import DatePicker from 'react-datepicker';
import {
    Control,
    Controller,
    FormState,
    RegisterOptions
} from 'react-hook-form';

type Props = {
    name?: string;
    control?: Control;
    formState?: FormState<any>;
    registerOptions: RegisterOptions;
    defaultValue: Date;
};

const ControlledSelect: React.FC<Props> = ({
    name,
    control,
    defaultValue,
    registerOptions
}) =>
    name && control ? (
        <Controller
            rules={registerOptions}
            name={name}
            control={control}
            defaultValue={defaultValue}
            render={({ onChange, value }) => {
                return (
                    <DatePicker
                        placeholderText="Fecha"
                        selected={value}
                        onChange={(date) => onChange(date)}
                    />
                );
            }}
        />
    ) : (
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        <DatePicker placeholderText="Fecha" onChange={(): void => {}} />
    );

export default ControlledSelect;
