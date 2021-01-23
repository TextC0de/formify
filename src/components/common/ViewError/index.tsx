import Link from 'next/link';
import styled, { FlattenSimpleInterpolation, css } from 'styled-components';

import Button from '@src/components/styled/Button';
import Heading from '@src/components/styled/Heading';

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

    ${Button} {
        margin-top: 1.5rem;
    }
`;
const Description = styled.p``;

type Props = {
    title?: string;
    description?: string;
    fullPage?: boolean;
    buttonText?: string;
    buttonHref?: string;
};

const ViewError: React.FC<Props> = ({
    title,
    description,
    fullPage,
    buttonText,
    buttonHref
}) => (
    <Wrapper fullPage={fullPage === true}>
        <Heading>{title}</Heading>
        <Description>{description}</Description>
        {buttonHref ? (
            <Link href={buttonHref} passHref>
                <Button as="a">{buttonText}</Button>
            </Link>
        ) : null}
    </Wrapper>
);

ViewError.defaultProps = {
    title: 'Ups, parece que algo ha salido mal',
    description: 'Vuelve más tarde o refresca la página para intentar de nuevo'
};

export default ViewError;
