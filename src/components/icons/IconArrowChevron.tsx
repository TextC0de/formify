import { HTMLAttributes } from 'react';
import { DefaultTheme } from 'styled-components';

export type Props = {
    color?: keyof DefaultTheme['colors']['text'];
    direction: 'up' | 'down' | 'right' | 'left';
};

const IconArrowChevron: React.FC<Props & HTMLAttributes<SVGElement>> = ({
    direction,
    color,
    ...props
}) => {
    const rotation = ((): number => {
        switch (direction) {
            case 'up':
                return 270;
            case 'down':
                return 90;
            case 'right':
                return 0;
            case 'left':
                return 180;
            default:
                return 0;
        }
    })();

    return (
        <svg
            {...props}
            className="IconArrowChevron"
            width="24"
            height="44"
            viewBox="0 0 24 44"
            fill={color || 'none'}
            xmlns="http://www.w3.org/2000/svg"
            transform={`rotate(${rotation})`}
        >
            <path
                d="M0.539965 0.537203C0.852581 0.22667 1.26703 0.0378617 1.70796 0.00510997C2.14888 -0.0276418 2.587 0.0978376 2.94266 0.358732L3.14944 0.537203L23.4591 20.7069C23.7718 21.0173 23.9619 21.4289 23.9949 21.8668C24.0278 22.3047 23.9015 22.7398 23.6388 23.093L23.4591 23.2983L3.14944 43.468C2.81957 43.7931 2.3784 43.9826 1.91398 43.9989C1.44956 44.0151 0.996055 43.8568 0.643972 43.5556C0.291888 43.2544 0.0671211 42.8324 0.0145313 42.3739C-0.0380586 41.9154 0.0853958 41.454 0.360256 41.0819L0.539965 40.8765L19.5448 22.0026L0.539965 3.1287C0.194208 2.7849 0 2.31886 0 1.83295C0 1.34704 0.194208 0.881005 0.539965 0.537203Z"
                fill="black"
            />
        </svg>
    );
};

IconArrowChevron.defaultProps = {
    color: 'primary'
};

export default IconArrowChevron;
