import styled, { FlattenSimpleInterpolation, css } from 'styled-components';

import Spinner from '@src/components/styled/Spinner';

type WrapperProps = {
    fullPage: boolean;
};

const Wrapper = styled.div<WrapperProps>`
    ${({ fullPage }): FlattenSimpleInterpolation | undefined =>
        fullPage
            ? css`
                  min-height: 100vh;
              `
            : undefined}
    padding: 3rem 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

type Props = {
    fullPage?: boolean;
};

const ViewLoading: React.FC<Props> = ({ fullPage }) => (
    <Wrapper fullPage={fullPage === true}>
        <Spinner />
    </Wrapper>
);

export default ViewLoading;
