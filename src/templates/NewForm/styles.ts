import styled from 'styled-components';

import Button from '@src/components/styled/Button';

export const Wrapper = styled.div`
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    ${Button} {
        margin-top: 1rem;
    }
`;
