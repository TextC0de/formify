import { DefaultTheme } from 'styled-components';

import theme from '@src/styles/theme';

type Props = {
    color?: keyof DefaultTheme['colors']['text'];
};

const IconClose: React.FC<Props> = ({ color, ...props }) => (
    <svg
        {...props}
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <mask
            id="maskClose"
            mask-type="alpha"
            maskUnits="userSpaceOnUse"
            x="5"
            y="5"
            width="14"
            height="14"
        >
            <path
                d="M18.299 5.70996C18.1122 5.5227 17.8585 5.41747 17.594 5.41747C17.3295 5.41747 17.0758 5.5227 16.889 5.70996L11.999 10.59L7.10899 5.69996C6.92216 5.5127 6.66851 5.40747 6.40399 5.40747C6.13948 5.40747 5.88583 5.5127 5.69899 5.69996C5.30899 6.08996 5.30899 6.71996 5.69899 7.10996L10.589 12L5.69899 16.89C5.30899 17.28 5.30899 17.91 5.69899 18.3C6.08899 18.69 6.71899 18.69 7.10899 18.3L11.999 13.41L16.889 18.3C17.279 18.69 17.909 18.69 18.299 18.3C18.689 17.91 18.689 17.28 18.299 16.89L13.409 12L18.299 7.10996C18.679 6.72996 18.679 6.08996 18.299 5.70996Z"
                fill={color && theme.colors.text[color]}
            />
        </mask>
        <g mask="url(#maskClose)">
            <rect x="-0.000976562" width="24" height="24" fill="#858C94" />
        </g>
    </svg>
);

IconClose.defaultProps = {
    color: 'primary'
};

export default IconClose;
