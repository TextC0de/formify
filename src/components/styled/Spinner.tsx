import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  to {transform: rotate(360deg);}
`;

type Props = {
    size?: number;
    color?: string;
};

const Spinner = styled.span<Props>`
    width: ${(props): string => (props.size ? `${props.size}px` : '32px')};
    height: ${(props): string => (props.size ? `${props.size}px` : '32px')};

    &:before {
        content: '';
        position: absolute;
        top: '50%';
        left: '50%';
        width: ${(props): string =>
            props.size !== undefined ? `${props.size}px` : '16px'};
        height: ${(props): string =>
            props.size !== undefined ? `${props.size}px` : '16px'};
        margin-top: ${(props): string =>
            props.size !== undefined ? `-${props.size / 2}px` : '-8px'};
        margin-left: ${(props): string =>
            props.size !== undefined ? `-${props.size / 2}px` : '-8px'};
        border-radius: 50%;
        border-top-color: transparent;
        border: 2px solid
            ${({ theme, color }): string =>
                color || theme.colors.palettes.primary.main};
        border-right-color: ${({ theme, color }): string =>
            color || theme.colors.palettes.primary.main};
        border-bottom-color: transparent;
        animation: ${spin} 2s linear infinite;
    }
`;

export default Spinner;
