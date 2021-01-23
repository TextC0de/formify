import styled, { FlattenSimpleInterpolation, css } from 'styled-components';

import Container from '@src/components/styled/Container';
import Spinner from '@src/components/styled/Spinner';

type WrapperProps = {
    fullPage: boolean;
};

const Wrapper = styled.div<WrapperProps>`
    ${Container} {
        padding: 3rem 0;
        ${({ fullPage }): FlattenSimpleInterpolation | undefined =>
            fullPage
                ? css`
                      min-height: 100vh;
                  `
                : undefined}
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
`;

type Props = {
    fullPage?: boolean;
};

const ViewLoading: React.FC<Props> = ({ fullPage }) => (
    <Wrapper fullPage={fullPage === true}>
        <Container>
            <Spinner />
        </Container>
    </Wrapper>
);

export default ViewLoading;
