import styled from 'styled-components';

import { palette } from '@src/utils/styled';

export const Wrapper = styled.div`
    display: flex;
    min-height: 100vh;

    > div {
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;

export const WithBg = styled.div`
    flex: 0 35%;
    background: ${palette('primary', 'main')};

    svg {
        width: 50%;
        height: auto;
    }
`;

export const Normal = styled.div`
    flex: 0 75%;
`;
