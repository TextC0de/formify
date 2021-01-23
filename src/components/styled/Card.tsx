import styled from 'styled-components';

import { backgroundPalette } from '@src/utils/styled';

const Card = styled.li`
    width: 100%;
    display: block;
    background: ${backgroundPalette('primary')};
    border-radius: 8px;
    border: 1px solid rgba(0, 0, 0, 0.25);
    padding: 1rem;
`;

export default Card;
