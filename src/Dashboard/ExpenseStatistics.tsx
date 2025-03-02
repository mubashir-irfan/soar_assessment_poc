// src/components/ExpenseStatistics.tsx

import { PieChart } from '../components';
import { ExpenseStatistic } from '../types';

interface ExpenseStatisticsProps {
  data: ExpenseStatistic[];
}

function ExpenseStatistics({ data }: ExpenseStatisticsProps) {
  const chartData = {
    labels: data.map((item) => item.label), // Use label directly from data
    datasets: [
      {
        data: data.map((item) => item.value),
        backgroundColor: generateColors(data.length),
        borderWidth: 0,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const label = context.label || '';
            const value = context.parsed || 0;
            return `${label}: ${value}%`;
          },
        },
      },
    },
  };

  function generateColors(count: number) {
    const baseColors = ['#343C6A', '#FC7900', '#232323', '#396AFF'];
    const generatedColors = [];
    for (let i = 0; i < count; i++) {
      generatedColors.push(baseColors[i % baseColors.length]);
    }
    return generatedColors;
  }

  return (
    <div className="h-[20.0625rem] sm:h-[16.9375rem] relative">
      <PieChart data={chartData} options={chartOptions} />
    </div>
  );
}

export default ExpenseStatistics;