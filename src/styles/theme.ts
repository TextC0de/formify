import { DefaultTheme } from 'styled-components';

const theme: DefaultTheme = {
    colors: {
        text: {
            primary: '#253031',
            secondary: '#545454',
            tertiary: '#78909C'
        },
        background: {
            primary: '#ffffff'
        },
        palettes: {
            primary: {
                main: '#7C4DFF',
                dark: '#7C4DFF',
                light: '#7C4DFF',
                contrastText: '#ffffff'
            },
            secondary: {
                main: '#a8d1e7',
                dark: '#1A1B41',
                light: '#59C3C3',
                contrastText: '#ffffff'
            },
            error: {
                light: '#BA5959',
                main: '#F76D6D',
                dark: '#D92121',
                contrastText: '#ffffff'
            }
        },
        charts: {
            purple: '#E289F2',
            green: '#1DD1A1',
            red: '#FF6B6B',
            blue: '#54A0FF'
        }
    },
    fonts: ['Source Sans Pro', 'Roboto']
};

export default theme;
