export type fieldType = 'input' | 'textarea' | 'check' | 'email' | 'date';
export const fieldTypes: fieldType[] = [
    'input',
    'textarea',
    'check',
    'email',
    'date'
];

export type fieldOption = {
    label: string;
    value: number;
};
