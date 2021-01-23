import styled from 'styled-components';

import { hexToRgbA } from '@src/utils/common';
import {
    backgroundPalette,
    ifProp,
    palette,
    textPalette
} from '@src/utils/styled';

type Props = {
    primary?: boolean;
    underlined?: boolean;
    light?: boolean;
};

const Anchor = styled.a<Props>`
    font-weight: 600;
    transition: 0.3s ease-in-out;
    color: ${ifProp(
        'primary',
        textPalette('primary'),
        backgroundPalette('primary')
    )};
    text-decoration: underline;

    &:hover {
        color: ${({ primary, theme }): string =>
            hexToRgbA(
                primary
                    ? palette('primary', 'main')({ theme })
                    : hexToRgbA(textPalette('primary')({ theme }), 0.1),
                0.9
            )};
    }
`;

Anchor.defaultProps = {
    primary: true,
    underlined: true
};

export default Anchor;
