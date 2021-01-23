import styled from 'styled-components';

import Button from '@src/components/styled/Button';
import { textPalette } from '@src/utils/styled';

export const Wrapper = styled.div`
    width: 75%;
`;

export const Header = styled.header`
    margin-bottom: 2rem;
`;

export const Title = styled.h4`
    color: ${textPalette('primary')};
    font-size: 1.5rem;
`;

export const Description = styled.p`
    margin-top: 0.375rem;
    color: ${textPalette('secondary')};
    font-size: 1rem;
`;

export const Field = styled.div``;

export const Buttons = styled.div`
    float: right;
`;

export const PrevButton = styled(Button)`
    font-size: 0.775rem;
    color: #333;
    background: #fff;
    border: 2px solid #333;
    padding: 0.375rem 2rem;
    margin-right: 1rem;
    margin-top: 2rem;

    &:hover {
        background: #ddd;
        color: #333;
    }
`;

export const OkButton = styled(Button)`
    font-size: 1rem;
    color: #fff;
    background: #333;
    border: 2px solid;
    padding: 0.375rem 2rem;
    margin-top: 2rem;

    &:hover {
        background: #666;
    }
`;
