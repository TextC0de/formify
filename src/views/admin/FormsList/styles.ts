import styled from 'styled-components';

import { hexToRgbA } from '@src/utils/common';
import { backgroundPalette, palette, textPalette } from '@src/utils/styled';

export const List = styled.div`
    ul:last-child {
        margin-bottom: 0;
    }
`;

export const Row = styled.ul`
    margin-bottom: 1rem;
    display: flex;

    li {
        flex: 0 calc(25% - 1rem);
        margin-right: 1rem;

        &:nth-child(1) {
            flex: 0 25%;
        }
    }

    @media (max-width: 720px) {
        flex-wrap: wrap;
        li {
            flex: 0 calc(50% - 1rem);
            margin-right: 1rem;
            margin-top: 0.375rem;
            margin-bottom: 0.375rem;

            &:nth-child(1) {
                flex: 0 calc(50% - 1rem);
                margin-right: 1rem;
            }
        }
    }
`;

export const Item = styled.li`
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    min-height: 10rem;
    background: ${backgroundPalette('primary')};
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    padding: 0.875rem;
    transition: 0.3s ease-in-out;
    cursor: pointer;
    text-align: center;

    &:hover {
        background: rgba(0, 0, 0, 0.05);
    }
`;

export const ItemTitle = styled.h4`
    color: ${textPalette('primary')};
    font-weight: 600;
`;

export const AddItem = styled(Item)`
    background: ${palette('primary', 'main')};
    color: ${palette('primary', 'contrastText')};

    svg {
        filter: invert(100%);
    }

    &:hover {
        background: ${({ theme }): string =>
            hexToRgbA(palette('primary', 'main')({ theme }), 0.8)};
    }
`;

export const EditFields = styled.span`
    display: block;
    margin-top: 1rem;
`;

export const SeeSubmissions = styled.span`
    display: block;
    margin-top: 1rem;
    padding: 0.375rem;
    font-size: 0.8rem;
    background: rgba(0, 0, 0, 0.05);
`;

export const AddItemText = styled.h4``;
