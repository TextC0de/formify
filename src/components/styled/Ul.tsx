import styled from 'styled-components';

import { textPalette } from '@src/utils/styled';

const Ul = styled.ul`
    font-weight: 300;
    color: ${textPalette('primary')};
    list-style: none;
    padding-left: 2.4rem;
    font-size: '1rem';

    li {
        position: relative;
        line-height: 1.75rem;

        &:not(:last-child) {
            margin-bottom: 0.125rem;
        }

        &:before {
            position: absolute;
            top: 0.775rem;
            left: -0.575rem;
            background: ${textPalette('primary')};
            width: 0.25rem;
            height: 0.25rem;
            border-radius: 50%;
            content: '';
        }
    }
`;

export default Ul;
