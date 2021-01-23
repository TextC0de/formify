import 'styled-components';

declare module 'styled-components' {
    export type Palette = {
        main: string;
        dark: string;
        light: string;
        contrastText: string;
    };

    export interface DefaultTheme {
        fonts: [string, string];
        colors: {
            text: {
                primary: string;
                secondary: string;
                tertiary: string;
            };
            background: {
                primary: string;
            };
            palettes: {
                primary: Palette;
                secondary: Palette;
                error: Palette;
            };
            charts: {
                purple: string;
                green: string;
                red: string;
                blue: string;
            };
        };
    }
}
