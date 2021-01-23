import 'swiper/swiper.min.css';

import { ReactIdSwiperProps, SwiperInstance } from 'react-id-swiper';
import ReactIdSwiperCustom from 'react-id-swiper/lib/ReactIdSwiper.custom';
import { Swiper } from 'swiper';

export type SwiperRefType = {
    swiper: SwiperInstance;
} & HTMLDivElement;

export type Props = {
    myRef?: React.RefObject<SwiperRefType>;
    params?: ReactIdSwiperProps;
    direction: 'horizontal' | 'vertical';
};

const SwiperCustom: React.FC<Props> = ({
    children,
    myRef,
    params: customParams,
    direction
}) => {
    const params = {
        Swiper,
        modules: [],
        noSwiping: true,
        ...customParams
    };

    return (
        <ReactIdSwiperCustom {...params} direction={direction} ref={myRef}>
            {children as React.ReactElement[]}
        </ReactIdSwiperCustom>
    );
};

export default SwiperCustom;
