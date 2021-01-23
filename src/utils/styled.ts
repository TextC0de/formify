import { DefaultTheme, Palette } from 'styled-components';

type WithTheme = {
    theme: DefaultTheme;
} & any;

export const font = (value: 0 | 1) => (props: WithTheme): string =>
    props.theme.fonts[value];

export const palette = (
    palette: keyof DefaultTheme['colors']['palettes'],
    color: keyof Palette
) => (props: WithTheme): string => props.theme.colors.palettes[palette][color];

export const textPalette = (color: keyof DefaultTheme['colors']['text']) => (
    props: WithTheme
): string => props.theme.colors.text[color];

export const backgroundPalette = (
    color: keyof DefaultTheme['colors']['background']
) => (props: WithTheme): string => props.theme.colors.background[color];

export const ifProp = (
    test: string | Record<string, string | number>,
    ifTrue: string | ((passedProps: WithTheme) => string),
    ifFalse: string | ((passedProps: WithTheme) => string)
) => (props: WithTheme) => (): string => {
    const isTrue =
        typeof test === 'string'
            ? props[test]
            : Object.keys(test).every((key) => props[key] === test[key]);

    const value = isTrue ? ifTrue : ifFalse;
    return typeof value === 'function' ? value(props) : value;
};
