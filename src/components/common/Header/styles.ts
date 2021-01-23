import styled, { FlattenSimpleInterpolation, css } from 'styled-components';

import { hexToRgbA } from '@src/utils/common';
import { backgroundPalette, palette, textPalette } from '@src/utils/styled';

export const HamburgerBar = styled.span`
    width: 1.5rem;
    height: 0.12rem;
    background: ${textPalette('primary')};
    display: inline-block;
    position: absolute;
    transition: 0.3s ease-in-out;
`;

type HamburgerProps = {
    closed: boolean;
};

export const Hamburger = styled.div<HamburgerProps>`
    border-radius: 50%;
    width: 2.5rem;
    height: 2.5rem;
    position: fixed;
    top: 2.22222rem;
    right: 2.22222rem;
    overflow: hidden;
    background: ${backgroundPalette('primary')};
    cursor: pointer;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.3);
    z-index: 4;

    &:hover {
        ${HamburgerBar} {
            background: ${textPalette('tertiary')};
        }
    }

    ${({ closed }): FlattenSimpleInterpolation =>
        closed
            ? css`
                  ${HamburgerBar} {
                      left: 0.5rem;

                      &:first-child {
                          top: 0.8rem;
                      }

                      &:nth-child(2) {
                          top: 1.2rem;
                      }

                      &:last-child {
                          top: 1.6rem;
                      }
                  }
              `
            : css`
                  ${HamburgerBar} {
                      top: 1.2rem;
                      left: 0.5rem;

                      &:first-child {
                          transform: rotate(45deg);
                      }

                      &:nth-child(2) {
                          transform: rotate(-45deg);
                      }

                      &:last-child {
                          transform: rotateY(90deg);
                      }
                  }
              `}
`;

export const Option = styled.a`
    font-weight: 600;
    cursor: pointer;
    text-decoration: none;
    display: block;
    font-size: 1.5rem;
    padding: 2rem;
    color: ${palette('primary', 'contrastText')};
    display: flex;
    align-items: center;
    cursor: pointer;

    &:hover {
        color: ${({ theme }): string =>
            hexToRgbA(textPalette('primary')({ theme }), 0.5)};
    }

    > span {
        margin-left: auto;
        font-weight: 400;
        font-size: 0.8rem;
        color: ${backgroundPalette('primary')};
    }
`;

export const Menu = styled.nav`
    box-shadow: 0 0 10px rgba(40, 40, 40, 0.4);
    position: fixed;
    left: 200vw;
    top: 0;
    bottom: 0;
    width: 100%;
    z-index: 3;
    overflow-y: scroll;
    background: ${palette('primary', 'main')};
    transition: 0.3s ease-in-out;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    &.open {
        left: 0;
    }
`;
