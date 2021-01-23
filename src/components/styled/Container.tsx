import styled from 'styled-components';

export type SizeProp = 'sm' | 'md' | 'xl';

type Props = {
    size?: SizeProp;
};

const width = ({ size }: Props): string => {
    switch (size) {
        case 'xl':
            return '84%';
        case 'md':
            return '79%';
        case 'sm':
            return '70%';
        default:
            return '79%';
    }
};

const Container = styled.div<Props>`
    width: ${width};
    max-width: 1140px;
    margin: 0 auto;
    box-sizing: border-box;
    transition: transform 150ms ease-out 0s;
`;

export default Container;
