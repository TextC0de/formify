import {
    Control,
    Controller,
    FormState,
    RegisterOptions
} from 'react-hook-form';

import IconCheck from '@src/components/icons/IconCheck';

import { Option, Wrapper } from './styles';

type TheFieldProps = {
    options: { value: string }[] | undefined;
    onClick?: (value: string[]) => void;
    selected?: string[];
};

const TheField: React.FC<TheFieldProps> = ({
    options,
    onClick,
    selected = []
}) => {
    const onClickHandler = (option: string) => (
        e: React.MouseEvent<HTMLLIElement>
    ) => {
        e.preventDefault();
        if (onClick) {
            let indexInSelected = -1;

            for (let i = 0; i < selected.length; i += 1) {
                const element = selected[i];
                if (element === option) {
                    indexInSelected = i;
                    break;
                }
            }

            if (indexInSelected === -1) {
                onClick(selected.concat(option));
            } else {
                const newSelectedOnes = selected
                    .slice(0, indexInSelected)
                    .concat(
                        selected.slice(indexInSelected + 1, selected.length)
                    );
                onClick(newSelectedOnes);
            }
        }
    };

    return (
        <Wrapper>
            {(options || [])
                .filter((option) => option.value)
                .map((option, i) => {
                    const isSelected = selected.includes(option.value);
                    return (
                        <Option
                            key={i}
                            onClick={onClickHandler(option.value)}
                            selected={selected.includes(option.value)}
                        >
                            {option.value}
                            {isSelected && <IconCheck />}
                        </Option>
                    );
                })}
        </Wrapper>
    );
};

type Props = {
    name?: string;
    control?: Control;
    formState?: FormState<any>;
    defaultValue: string[];
    options: { value: string }[] | undefined;
    registerOptions: RegisterOptions;
};

const CheckField: React.FC<Props> = ({
    name,
    control,
    registerOptions,
    defaultValue,
    options
}) =>
    name ? (
        <Controller
            rules={registerOptions}
            name={name}
            defaultValue={defaultValue}
            control={control}
            render={({ onChange, value }) => {
                return (
                    <TheField
                        options={options}
                        onClick={(option) => onChange(option)}
                        selected={value}
                    />
                );
            }}
        />
    ) : (
        <TheField options={options} />
    );

export default CheckField;
