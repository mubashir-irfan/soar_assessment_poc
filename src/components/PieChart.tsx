import React from 'react';
import { ArcElement, ChartDataset, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartProps {
  data: {
    labels: string[];
    datasets: {
      data: number[];
      backgroundColor: string[];
      borderWidth?: number;
    }[];
  };
  options?: any;
}

function PieChart({ data, options }: PieChartProps) {

  return <Pie data={data} options={options} />;
}

export default PieChart;