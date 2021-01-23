import { Controller } from 'react-hook-form';
import Switch from 'react-switch';

type Props = {
    name: string;
    control: any;
    formState: any;
    defaultValue: any;
};

const ControlledSwitch: React.FC<Props> = ({ name, control, defaultValue }) => (
    <Controller
        defaultValue={defaultValue}
        control={control}
        name={name}
        render={({ onChange, value }) => {
            return (
                <Switch
                    width={42}
                    height={16}
                    borderRadius={50}
                    onChange={(checked) => onChange(checked)}
                    checked={value}
                />
            );
        }}
    />
);

export default ControlledSwitch;
