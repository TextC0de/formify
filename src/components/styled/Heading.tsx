import { createElement } from 'react';
import styled, { css } from 'styled-components';

import { textPalette } from '@src/utils/styled';

const fontSize = ({ level }: { level: number }): string =>
    `${0.75 + 1 * (1 / level)}rem`;

const styles = css`
    font-weight: 400;
    color: ${textPalette('primary')};
    font-size: ${fontSize};
    margin: 0;
    margin-bottom: 0.57142em;
`;

const StyledHeading = styled(({ level, children, theme, ...props }) =>
    createElement(`h${level}`, props, children)
)`
    ${styles}
`;

type Props = {
    level?: 1 | 2 | 3 | 4 | 5 | 6;
};

const Heading: React.FC<Props & React.HTMLAttributes<HTMLElement>> = (
    props
) => {
    return <StyledHeading {...props} />;
};

Heading.defaultProps = {
    level: 1
};

export default styled(Heading)<Props>``;
