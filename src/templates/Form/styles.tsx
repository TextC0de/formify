import styled from 'styled-components';

import { textPalette } from '@src/utils/styled';

export const Wrapper = styled.div`
    display: flex;
    align-items: center;
    min-height: 100vh;

    .swiper-container {
        min-height: calc(10rem + 272px);
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;

export const Field = styled.div``;

export const Slide = styled.div`
    display: flex;
    align-items: center;
    height: 100%;
    margin: 1rem 0.225rem;
    .react-datepicker-popper {
        transform: translate3d(0px, 25%, 0px) !important;
    }
`;

export const StartEndSlide = styled(Slide)`
    min-height: 100vh;
    display: flex;
    align-items: center;
    margin: 0 0.225rem;
`;

export const StartEndTitle = styled.h2`
    font-size: 1.3rem;
    color: ${textPalette('primary')};
`;
