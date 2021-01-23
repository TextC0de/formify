import { createGlobalStyle } from 'styled-components';

import { textPalette } from '@src/utils/styled';

const ResetStyle = createGlobalStyle`
    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }

    html {
        min-height: 100vh;
        line-height: 1.15;
        font-family: ${({ theme }): string => theme.fonts[0]}, sans-serif;
        -webkit-tap-highlight-color: transparent;
    }

    body {
        margin: 0;
        color: ${textPalette('secondary')};
        background-color: #fff;
    }

    p, span, h1, h2, h3, h4,  h5, h6 {
        font-weight: 400;
        padding: 0;
        margin: 0;
    }

    input, textarea {
        font-family: ${({ theme }): string => theme.fonts[0]}, sans-serif;
    }

    textarea:focus, input:focus {
        outline: none;
    }

    textarea {
        resize: none;
    }

    main {
        outline: none;
    }

    article,
    figure,
    footer,
    header,
    main,
    nav,
    section {
        display: block;
    }

    canvas {
        max-width: 100%;
    }

    button {
        margin: 0;
        border: 0;
    }

    ul, ol {
        padding: 0;
        margin: 0;
        list-style: none;
    }

    a {
        text-decoration: none;
    }

    .react-datepicker-wrapper {
        display: block;
        
        input {
            font-size: 1.5rem;
            width: 100%;
            display: block;
            border: 0;
            border-bottom: 2px solid #333;
            padding: .375rem 0;
        }
        
    }
`;

export default ResetStyle;
