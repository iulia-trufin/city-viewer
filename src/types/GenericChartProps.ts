import {
  type axisChartTypes,
  circularChartTypes,
} from "../constants/chartTypes.ts";

export type AxisChartType = (typeof axisChartTypes)[number];
export type CircularChartType = (typeof circularChartTypes)[number];

export type AxisChartSeries = {
  name: string;
  data: number[];
}[];
export type CircularChartSeries = number[];

export type GenericChartProps =
  | {
      title: string;
      type: AxisChartType;
      categories: string[];
      series: AxisChartSeries;
    }
  | {
      title: string;
      type: CircularChartType;
      categories: string[];
      series: CircularChartSeries;
    };
