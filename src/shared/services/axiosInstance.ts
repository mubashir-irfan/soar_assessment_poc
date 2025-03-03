import axios from 'axios';
import { mockDataService } from '../../services/mockData';
import {APIEndpoints} from '.';

const axiosInstance = axios.create({
  baseURL: '/api',
});

const createMockResponse = (data: any, config: any) => ({
  data,
  status: 200,
  statusText: 'OK',
  headers: { 'Content-Type': 'application/json' },
  config,
});

axiosInstance.interceptors.request.use(async (config) => {
  const urlMap: Record<string, () => Promise<any>> = {
    [APIEndpoints.cards.getCards()]: mockDataService.getBankingCards,
    [APIEndpoints.transactions.getRecentTransactions()]: mockDataService.getTransactions,
    [APIEndpoints.weeklyActivity.getWeeklyActivity()]: mockDataService.getWeeklyActivity,
    [APIEndpoints.expenseStatistics.getExpenseStatistics()]: mockDataService.getExpenseStatistics,
    [APIEndpoints.contacts.getContacts()]: mockDataService.getContacts,
    [APIEndpoints.balanceHistory.getBalanceHistory()]: mockDataService.getBalanceHistory,
    [APIEndpoints.profile.getUserProfile()]: mockDataService.getUserProfile,
  };

  const postUrlMap: Record<string, () => Promise<any>> = {
    [APIEndpoints.weeklyActivity.update()]: async () => {
      const { amount, isDeposit } = JSON.parse(config.data);
      return mockDataService.updateTodayActivity(amount, isDeposit);
    },
  };

  let mockResponse;
  const url: string = config.url ?? '';
  if (urlMap[url]) {
    mockResponse = await createMockResponse(await urlMap[url](), config);
  }  else if (config.method === 'post' && postUrlMap[url]) {
    mockResponse = await createMockResponse(await postUrlMap[url](), config);
  }

  if (mockResponse) {
    config.adapter = async () => mockResponse.data;
  }

  return config;
});

export default axiosInstance;