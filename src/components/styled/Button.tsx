import styled, { css } from 'styled-components';

import { ifProp, palette } from '@src/utils/styled';

type Size = 'sm' | 'md' | 'xl';

const fontSize = ({ size }: { size?: Size }): string => {
    const divideBy = ((): number => {
        switch (size) {
            case 'sm':
                return 3;
            case 'md':
                return 2;
            case 'xl':
                return 1;
            default:
                return 2;
        }
    })();

    return `${0.35 + 1 * (1 / divideBy)}rem`;
};

export type Props = {
    block?: boolean;
    primary?: boolean;
    secondary?: boolean;
    outline?: boolean;
    size?: Size;
};

const Button = styled.button<Props>`
    padding: 1rem 2rem;
    border-radius: 5px;
    font-size: ${fontSize};
    font-weight: 600;
    cursor: pointer;
    border: none;
    transition: 0.3s ease-in-out;
    text-transform: uppercase;
    display: ${ifProp('block', 'block', 'inline-block')};
    width: ${ifProp('block', '100%', 'auto')};
    text-align: center;

    ${({ outline, primary, theme }) =>
        outline &&
        css`
            border: 2px solid
                ${palette(primary ? 'primary' : 'secondary', 'main')({ theme })};
        `};

    ${({ outline, primary, theme }) =>
        css`
            background: ${
                outline
                    ? 'transparent'
                    : `${palette(
                          primary ? 'primary' : 'secondary',
                          'main'
                      )({ theme })}`
            };

            color: ${
                outline
                    ? `${palette(
                          primary ? 'primary' : 'secondary',
                          'main'
                      )({ theme })}`
                    : `${palette(
                          primary ? 'primary' : 'secondary',
                          'contrastText'
                      )({ theme })}`
            };

            &:hover {
                background: ${palette(
                    primary ? 'primary' : 'secondary',
                    'light'
                )({ theme })};
                color: ${`${palette(
                    primary ? 'primary' : 'secondary',
                    'contrastText'
                )({ theme })}`};
            };
        }
    `};
`;

Button.defaultProps = {
    primary: true,
    size: 'md'
};

export default Button;
