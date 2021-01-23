import styled from 'styled-components';

import Button from '@src/components/styled/Button';
import Container from '@src/components/styled/Container';
import { hexToRgbA } from '@src/utils/common';
import { palette } from '@src/utils/styled';

export const Logo = styled.a`
    font-size: 1rem;
    font-weight: 600;
    color: ${palette('primary', 'main')};

    &:hover {
        color: ${({ theme }) =>
            hexToRgbA(palette('primary', 'main')({ theme }), 0.3)};
    }
`;

export const Buttons = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-left: auto;
`;

export const Wrapper = styled.header`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 10;
    background: #fff;
    border-bottom: 1px solid #ddd;
    padding: 0.875rem 0;

    ${Container} {
        display: flex;
        align-items: center;
    }

    ${Button} {
        margin-top: 0 !important;
        padding: 0.375rem 0.875rem;
    }
`;
