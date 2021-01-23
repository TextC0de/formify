import { ChartData, ChartDataSets, ChartOptions } from 'chart.js';

export type ChartPallete = {
    bg: string;
    bgHover?: string;
    color?: string;
    alpha?: number;
};

declare module 'chart.js' {
    interface ExtendedCharDatasets extends ChartDataSets {
        tension?: number;
    }

    interface ExtendedChartOptions extends ChartOptions {
        label?: {
            display?: boolean;
        };
    }

    interface ExtendedChartData extends ChartData {
        datasets?: ExtendedCharDatasets[];
    }
}
