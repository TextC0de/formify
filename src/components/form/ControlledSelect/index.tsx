import { Control, Controller, FormState } from 'react-hook-form';

import Dropdown, { Props as DropdownProps } from '../../common/Dropdown';

interface Props extends Omit<Omit<DropdownProps, 'onChange'>, 'value'> {
    control: Control;
    name: string;
    formState: FormState<any>;
    defaultValue: any;
}

const ControlledSelect: React.FC<Props> = ({
    label,
    options,
    placeholder,
    name,
    control,
    defaultValue
}) => (
    <Controller
        defaultValue={defaultValue}
        control={control}
        name={name}
        render={({ onChange, value }) => (
            <Dropdown
                label={label}
                options={options}
                placeholder={placeholder}
                value={value}
                onChange={(option) => onChange(option.value)}
            />
        )}
    />
);

export default ControlledSelect;
