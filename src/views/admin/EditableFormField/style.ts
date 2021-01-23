import styled from 'styled-components';

import Card from '@src/components/styled/Card';

export const Wrapper = styled(Card)``;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
`;

export const Footer = styled.footer``;

export const Required = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;

    label {
        display: block;
        margin-right: 1rem;
    }
`;

export const Option = styled.div`
    display: flex;
    align-items: center;

    input {
        margin-right: 1rem;
    }

    svg {
        cursor: pointer;
    }

    svg:hover {
        filter: invert(23%) sepia(91%) saturate(6858%) hue-rotate(3deg)
            brightness(97%) contrast(103%);
    }
`;

export const AddOption = styled.div`
    margin-top: 1rem;
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 0.375rem 0.875rem;
    transition: 0.3s ease-in-out;
    border: 1px solid #ddd;

    svg {
        margin-left: auto;
        border-radius: 50%;
        border: 1px solid #ddd;
    }

    &:hover {
        background: #ddd;
    }
`;
