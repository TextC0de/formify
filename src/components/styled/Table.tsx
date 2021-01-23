import styled from 'styled-components';

import { hexToRgbA } from '@src/utils/common';
import { backgroundPalette, palette, textPalette } from '@src/utils/styled';

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;

    th,
    td {
        padding: 0.875rem;
    }

    tr {
        border-bottom: 1px solid
            ${({ theme }): string =>
                hexToRgbA(textPalette('tertiary')({ theme }), 0.25)};
    }

    tr:last-child {
        border-radius: 0 0.375rem 0.375rem 0;
    }

    th {
        text-align: left;
        color: ${palette('primary', 'contrastText')};
        background: ${palette('primary', 'main')};
        border-right: 1px solid
            ${({ theme }): string =>
                hexToRgbA(palette('primary', 'contrastText')({ theme }), 0.1)};
    }

    td {
        padding: 0.375rem;
        border-top: 0;
        border-bottom: 0;
        border-right: 1px solid
            ${({ theme }): string =>
                hexToRgbA(textPalette('primary')({ theme }), 0.08)};
        background: ${backgroundPalette('primary')};
    }
`;

export default Table;
