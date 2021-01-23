import styled from 'styled-components';

import { textPalette } from '@src/utils/styled';

export const Wrapper = styled.div`
    position: relative;
`;

export const DropdownButton = styled.button`
    margin: 0.125rem 0 0;
    border: 1px solid ${textPalette('tertiary')};
    width: 100%;
    padding: 0.875rem;
    border-radius: 8px;
    display: flex;
    transition: 0.3s ease-in-out;
    cursor: pointer;
    font-size: 0.8rem;
    line-height: 1.5rem;
    color: #09101d;
    opacity: 0.8;
    font-weight: 600;
    background: #fff;

    &:hover {
        background: #eee;
    }
`;

export const DropdownButtonIcon = styled.div`
    pointer-events: all;
    margin-left: auto;

    &,
    svg {
        width: 1.5rem;
        height: 1.5rem;
    }

    svg {
        pointer-events: none;
    }
`;

export const Option = styled.li<{ selected?: boolean }>`
    line-height: 1.8rem;
    padding: 0.875rem;
    cursor: pointer;

    &:focus,
    &:hover,
    &:active {
        background: ${({ selected }): string | undefined =>
            !selected ? '#ececec' : '#ddd'};
    }
`;

export const Menu = styled.ul`
    z-index: 1;
    width: 100%;
    position: absolute;
    max-height: 40vh;
    overflow-y: scroll;
    list-style: none;
    top: 100%;
    border: 1px solid #cecece;
    border-top: 0;
    background: #fff;

    li:not(:last-child) {
        border-bottom: 1px solid #dddddd;
    }
`;
