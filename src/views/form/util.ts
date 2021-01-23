import { FormFieldData } from '@src/graphql/query/form.query';

export const fieldIsValid = (
    { options, required, type }: Omit<FormFieldData, '_id'>,
    value: any
): boolean => {
    if (required && !value) {
        return false;
    }

    if (!value) {
        return true;
    }

    if (
        type === 'email' &&
        !/^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            value
        )
    ) {
        return false;
    }

    if (type === 'check') {
        if (options) {
            const mappedValues = options.map(({ value }) => value);
            return value.every((someValue: string) =>
                mappedValues.includes(someValue)
            );
        } else {
            return false;
        }
    }

    return true;
};
