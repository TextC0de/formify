import { LiHTMLAttributes } from 'react';
import styled from 'styled-components';

import Card from '@src/components/styled/Card';
import { FormFieldData } from '@src/graphql/query/form.query';
import { textPalette } from '@src/utils/styled';

const Field = styled.div``;

const FieldTitle = styled.h4`
    text-transform: uppercase;
    font-size: 0.775rem;
    color: ${textPalette('primary')};
`;

const FieldValue = styled.p`
    font-size: 1.2rem;
`;

const Wrapper = styled(Card)`
    ${Field}:not(:last-child) {
        margin-bottom: 1rem;
    }
`;

type Props = {
    fields: FormFieldData[];
    submissionFields: {
        _id: string;
        field: string;
        fieldValue: any;
    }[];
};

const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    if (month < 10) {
        return `${day}/0${month}/${year}`;
    } else {
        return `${day}/${month}/${year}`;
    }
};

const SubmissionCard: React.FC<Props & LiHTMLAttributes<HTMLLIElement>> = ({
    fields,
    submissionFields,
    ...props
}) => {
    return (
        <Wrapper {...props}>
            {fields.map((field) => {
                let value = submissionFields.find(
                    (submissionField) =>
                        submissionField && field._id === submissionField.field
                )?.fieldValue;

                if (field.type === 'date') {
                    value = formatDate(value);
                }

                if (field.type === 'check') {
                    value = value.join(', ');
                }

                return (
                    <Field key={field._id}>
                        <FieldTitle>{field.title}</FieldTitle>
                        {value ? <FieldValue>{value}</FieldValue> : null}
                    </Field>
                );
            })}
        </Wrapper>
    );
};

export default SubmissionCard;
