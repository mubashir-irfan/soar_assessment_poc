// src/components/BalanceHistoryChart.tsx

import React from 'react';
import { AreaChart } from '../components';
import { BalanceHistory } from '../types';
import { AreaChartData } from '../components/AreaChart';

interface BalanceHistoryChartProps {
  history: BalanceHistory | undefined;
}

function BalanceHistoryChart({ history }: BalanceHistoryChartProps) {
  if (!history) return 'empty state';
  const chartData: AreaChartData = {
    labels: history.labels,
    values: history.amounts,
  };
  return <AreaChart data={chartData} lineColor="#1814F3" />;
}

export default BalanceHistoryChart;
