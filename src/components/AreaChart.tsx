import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

import { useTranslation } from 'react-i18next';
import designSystem from '../design-system';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export type AreaChartData = {
  labels: string[];
  values: number[];
}

interface AreaChartProps {
  data: AreaChartData;
  lineColor: string;
}

function AreaChart({ data, lineColor }: AreaChartProps) {
  const { i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';
  const labelFontSize = window.innerWidth < 640 ? 12 : 14;

  const calculateYAxisOptions = () => {
    const dataValues: number[] = data.values;
    const minValue = Math.min(...dataValues);
    const maxValue = Math.max(...dataValues);
    const range = maxValue - minValue;
    const idealTicks = 5; // Adjust as needed
    let stepSize = range / idealTicks;

    // Round stepSize to a nice number
    const magnitudes = Math.pow(10, Math.floor(Math.log10(stepSize)));
    const roundedStepSize = Math.ceil(stepSize / magnitudes) * magnitudes;

    // Adjust min and max to align with stepSize
    const adjustedMin = Math.floor(minValue / roundedStepSize) * roundedStepSize;
    const adjustedMax = Math.ceil(maxValue / roundedStepSize) * roundedStepSize;

    return {
      border: {
        dash: [5, 5],
      },
      ticks: {
        stepSize: roundedStepSize,
        color: 'var(--text-secondary)',
        font: {
          size: labelFontSize,
        },
      },
      min: adjustedMin,
      max: adjustedMax,
    };
  };

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Balance',
        data: data.values,
        fill: true,
        backgroundColor: (context: any) => {
          const ctx = context.chart.ctx;
          const chartArea = context.chart.chartArea;

          if (!chartArea) {
            return null;
          }

          const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
          gradient.addColorStop(0, `rgba(${parseInt(lineColor.slice(1, 3), 16)}, ${parseInt(lineColor.slice(3, 5), 16)}, ${parseInt(lineColor.slice(5, 7), 16)}, 0.5)`); // #RRGGBB80
          gradient.addColorStop(1, `rgba(${parseInt(lineColor.slice(1, 3), 16)}, ${parseInt(lineColor.slice(3, 5), 16)}, ${parseInt(lineColor.slice(5, 7), 16)}, 0)`); // #RRGGBB00
          return gradient;
        },
        borderColor: lineColor,
        tension: 0.4,
        borderWidth: 3,
      },
    ],
    options: {
      scales: {
        xAxes: [{
          gridLines: {
            borderDash: [8, 4],
            color: designSystem.colors.border.light,
          }
        }],
        yAxes: [{
          gridLines: {
            borderDash: [8, 4],
            color: designSystem.colors.border.light,
          }
        }]
      }
    }
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        rtl: isRTL,
      },
    },
    scales: {
      x: {
        border: {
          dash: [5, 5],
        },
        ticks: {
          color: designSystem.colors.text.secondary,
          font: {
            size: labelFontSize,
          },
        },
      },
      y: {
        ...calculateYAxisOptions(),
      },
    },
  };

  return <Line data={chartData} options={options} />;
}

export default AreaChart;