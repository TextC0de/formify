import styled, { css } from 'styled-components';

import { ifProp, palette, textPalette } from '@src/utils/styled';

type Props = {
    size?: 'normal' | 'big';
    block?: boolean;
    tertiary?: boolean;
    defaultColor?: boolean;
    primary?: boolean;
    uppercase?: boolean;
    bold?: boolean;
};

const fontSize = ({ size }: Props): string => {
    switch (size) {
        case 'normal':
            return '0.875rem';
        case 'big':
            return '0.875rem';
        default:
            return '0.875rem';
    }
};

const Span = styled.span<Props>`
    font-size: ${fontSize};
    display: ${ifProp('block', 'block', 'inline-block')};

    ${({ defaultColor, theme }) =>
        defaultColor &&
        css`
            color: ${textPalette('primary')({ theme })};
        `}

    ${({ primary, theme }) =>
        primary &&
        css`
            color: ${palette('primary', 'main')({ theme })};
        `}

    
        
    ${({ tertiary, theme }) =>
        tertiary &&
        css`
            color: ${textPalette('tertiary')({ theme })};
        `}
    font-weight: ${ifProp('bold', '600', '400')};
    font-size: 0.875rem;
    text-transform: ${ifProp('uppercase', 'uppercase', 'normal')};
`;

Span.defaultProps = {
    defaultColor: true
};

export default Span;
