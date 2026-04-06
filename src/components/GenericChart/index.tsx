import type {
  AxisChartType,
  CircularChartType,
  GenericChartProps,
} from "../../types/GenericChartProps.ts";
import type { ApexOptions } from "apexcharts";
import { useThemeMode } from "../../providers/ThemeProviderWrapper";
import { Box, Card, CardContent, Typography, useTheme } from "@mui/material";
import Chart from "react-apexcharts";
import {
  axisChartTypes,
  circularChartTypes,
} from "../../constants/chartTypes.ts";
import { formatNumberShort } from "../../helpers/formatNumberShort.ts";

export const GenericChart = ({
  title,
  type,
  categories,
  series,
}: GenericChartProps) => {
  const { mode } = useThemeMode();
  const theme = useTheme();

  const isAxis = axisChartTypes.includes(type as AxisChartType);
  const isCircular = circularChartTypes.includes(type as CircularChartType);

  const greyScale =
    mode === "dark"
      ? [
          theme.palette.grey[300],
          theme.palette.grey[500],
          theme.palette.grey[700],
          theme.palette.grey[900],
        ]
      : [
          theme.palette.grey[900],
          theme.palette.grey[700],
          theme.palette.grey[500],
          theme.palette.grey[300],
        ];

  const options: ApexOptions = {
    chart: {
      type,
      toolbar: { show: false },
      foreColor: theme.palette.text.secondary,
      background: "transparent",
    },
    colors: greyScale,
    grid: isAxis
      ? {
          borderColor: theme.palette.divider,
        }
      : {},
    theme: { mode },
    dataLabels: { enabled: false },
    xaxis: isAxis
      ? {
          categories,
          labels: {
            style: {
              fontSize: "12px",
              colors: theme.palette.text.secondary,
            },
            formatter: (value) => formatNumberShort(Number(value)),
          },
        }
      : {},
    yaxis: isAxis
      ? {
          labels: {
            style: {
              colors: theme.palette.text.secondary,
            },
          },
        }
      : {},
    labels: isCircular ? categories : [],
    plotOptions: isAxis
      ? {
          bar: {
            borderRadius: 6,
            horizontal: true,
          },
        }
      : {},
    legend: {
      labels: {
        colors: theme.palette.text.primary,
      },
    },
    tooltip: {
      followCursor: true,
      intersect: false, // allows tooltip even if cursor isn't perfectly on the bar
      shared: false,
      theme: "light",
      style: {
        fontSize: "12px",
      },
      custom: function ({ series, seriesIndex, dataPointIndex, w }) {
        const label = isCircular
          ? w.globals.labels[seriesIndex]
          : w.globals.labels[dataPointIndex];
        const value = isCircular
          ? series[seriesIndex]
          : series[seriesIndex][dataPointIndex];

        return `
          <div style="
            background: rgba(0,0,0,0.7);
            color: #fff;
            padding: 8px 12px;
            border-radius: 8px;
            font-size: 12px;
          ">
            <strong>${label}</strong>: ${value.toLocaleString()}
          </div>
        `;
      },
    },
  };

  const dynamicHeight = isAxis ? Math.max(350, categories.length * 35) : 350;

  return (
    <Card sx={{ borderRadius: 3 }}>
      <CardContent>
        <Typography sx={{ mb: 2, fontWeight: 600 }}>{title}</Typography>
        <Box
          sx={{
            maxHeight: 350,
            overflowY: dynamicHeight > 350 ? "auto" : "hidden",
          }}
        >
          <Chart
            options={options}
            series={series}
            type={type}
            height={dynamicHeight}
          />
        </Box>
      </CardContent>
    </Card>
  );
};
