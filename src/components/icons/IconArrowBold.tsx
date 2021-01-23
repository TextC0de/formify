import { DefaultTheme } from 'styled-components';

import theme from '@src/styles/theme';

export interface Props {
    color?: keyof DefaultTheme['colors']['text'];
    direction: 'up' | 'down' | 'right' | 'left';
}

const IconArrow: React.FC<Props & React.HTMLAttributes<SVGElement>> = ({
    direction,
    color,
    ...props
}) => {
    const rotation = ((): number => {
        switch (direction) {
            case 'up':
                return 180;
            case 'down':
                return 0;
            case 'right':
                return 270;
            case 'left':
                return 90;
            default:
                return 0;
        }
    })();

    return (
        <svg
            {...props}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            transform={`rotate(${rotation})`}
        >
            <mask
                id="maskIconArrowBold"
                mask-type="alpha"
                maskUnits="userSpaceOnUse"
                x="4"
                y="8"
                width="15"
                height="8"
            >
                <path
                    d="M5.57707 10.9788L10.6269 15.4905C11.3873 16.1698 12.6156 16.1698 13.376 15.4905L18.4258 10.9788C19.6541 9.88133 18.7767 8 17.0415 8H6.94188C5.20662 8 4.34874 9.88133 5.57707 10.9788Z"
                    fill={color && theme.colors.text[color]}
                />
            </mask>
            <g mask="url(#maskIconArrowBold)">
                <path
                    d="M-0.000976562 0H23.999V24H-0.000976562V0Z"
                    fill="#858C94"
                />
            </g>
        </svg>
    );
};

IconArrow.defaultProps = {
    color: 'primary'
};

export default IconArrow;
