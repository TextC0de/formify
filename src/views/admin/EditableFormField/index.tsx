import { useFieldArray, useFormContext } from 'react-hook-form';
import { fieldType } from 'shared/fields';

import ControlledSelect from '@src/components/form/ControlledSelect';
import ControlledSwitch from '@src/components/form/ControlledSwitch';
import NestedInput from '@src/components/form/NestedInput';
import IconAdd from '@src/components/icons/IconAdd';
import IconBin from '@src/components/icons/IconBin';
import Label from '@src/components/styled/Label';

import { AddOption, Content, Option, Required, Wrapper } from './style';

const fields: { value: fieldType; label: string }[] = [
    { value: 'input', label: 'Texto corto' },
    { value: 'textarea', label: 'Texto largo' },
    { value: 'check', label: 'Selección multiple' },
    { value: 'email', label: 'Correo electrónico' },
    { value: 'date', label: 'Fecha' }
];

type Props = {
    name: string;
    field: any;
    isCheck: boolean;
};

const EditableFormField: React.FC<Props> = ({ name, field, isCheck }) => {
    const methods = useFormContext();
    const { control } = methods;

    const { fields: options, append, remove } = useFieldArray({
        control,
        name: `${name}.options`
    });

    const addOption = () => {
        append({ value: '' });
    };

    return (
        <Wrapper>
            <Content>
                <Required>
                    <Label>Requerido</Label>
                    <ControlledSwitch
                        {...methods}
                        name={`${name}.required`}
                        defaultValue={field.required}
                    />
                </Required>

                <ControlledSelect
                    {...methods}
                    name={`${name}.type`}
                    label="Tipo de pregunta*"
                    placeholder="Tipo de pregunta"
                    defaultValue={field.type}
                    options={fields}
                />

                <NestedInput
                    {...methods}
                    registerOptions={{ required: true }}
                    placeholder="Título*"
                    autoComplete="off"
                    name={`${name}.title`}
                    defaultValue={field.title}
                />

                <NestedInput
                    {...methods}
                    autoComplete="off"
                    placeholder="Descripción"
                    name={`${name}.description`}
                    defaultValue={field.description}
                />

                {isCheck && (
                    <div style={{ marginTop: '1.5rem' }}>
                        <Label>Opciones</Label>
                        {options.map((option, index) => (
                            <Option key={option.id}>
                                <NestedInput
                                    {...methods}
                                    placeholder={`Opción ${index + 1}`}
                                    name={`${name}.options[${index}].value`}
                                    defaultValue={option.value}
                                />
                                <IconBin onClick={() => remove(index)} />
                            </Option>
                        ))}

                        <AddOption onClick={addOption}>
                            Agregar opción <IconAdd />
                        </AddOption>
                    </div>
                )}
            </Content>
        </Wrapper>
    );
};

export default EditableFormField;
