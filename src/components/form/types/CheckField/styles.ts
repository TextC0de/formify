import styled from 'styled-components';

import Card from '@src/components/styled/Card';

export const Wrapper = styled.ul`
    list-style: none;

    li:not(:last-child) {
        margin-bottom: 0.375rem;
    }
`;

type OptionProps = {
    selected: boolean;
};

export const Option = styled(Card)<OptionProps>`
    display: flex;
    align-items: center;
    background: ${({ selected }): string => (selected ? '#ddd' : '#fff')};
    cursor: pointer;
    transition: 0.15s ease-in-out;
    padding: 0.375rem 0.875rem;

    &:hover {
        background: #ddd;
    }

    svg {
        margin-left: auto;
        width: 1rem;
        height: auto;
    }
`;
