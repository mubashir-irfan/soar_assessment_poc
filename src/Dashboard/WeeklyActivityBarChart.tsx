import {
  BarElement,
  CategoryScale,
  Chart,
  ChartOptions,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useTranslation } from 'react-i18next';
import designSystem from '../design-system';
import { WeeklyActivity } from '../types';
import { useState, useEffect } from 'react';

Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface WeeklyActivityBarChartProps {
  data: WeeklyActivity;
}

function WeeklyActivitBarChart({ data }: WeeklyActivityBarChartProps) {
  const { t } = useTranslation();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Adjust breakpoint as needed
    };

    handleResize(); // Initial check

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const chartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: designSystem.colors.background.light,
        },
        ticks: {
          color: designSystem.colors.text.secondary,
          stepSize: 100,
        },
        border: {display: false}
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: designSystem.colors.text.secondary,
        },
        border: {display: false}
        
      },
      
    },
    plugins: {
      legend: {
        position: 'top' as 'top',
        align: 'end',
        labels: {
          color: designSystem.colors.text.secondary,
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 20,
          boxWidth: 12,
          boxHeight: 12,
          font: {
            size: 12,
          },
        },
      },
    },
  };

  const labels = data.labels;
  const chartData = {
    labels,
    datasets: [
      {
        label: t('weeklyActivity.withdrawal'),
        data: data.withdrawals,
        backgroundColor: designSystem.colors['active'],
        borderRadius: {
          topLeft: 30,
          topRight: 30,
          bottomLeft: 30,
          bottomRight: 30,
        },
        borderSkipped: false,
        barThickness: isMobile ? 12 : 14
      },
      {
        label: t('weeklyActivity.deposit'),
        data: data.deposits,
        backgroundColor: designSystem.colors['soar-blue'],
        borderRadius: {
          topLeft: 30,
          topRight: 30,
          bottomLeft: 30,
          bottomRight: 30,
        },
        borderSkipped: false,
        barThickness: isMobile ? 12 : 14
      },
    ],
  };

  return <Bar data={chartData} options={chartOptions} />;
}

export default WeeklyActivitBarChart;