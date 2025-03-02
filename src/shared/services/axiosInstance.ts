import axios from 'axios';
import { mockDataService } from '../../services/mockData';
import {APIEndpoints} from '.';

const axiosInstance = axios.create({
  baseURL: '/api',
});

const createMockResponse = async (data: any, config: any) => ({
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

  let mockResponse;

  if (config.url && urlMap[config.url]) {
    mockResponse = await createMockResponse(await urlMap[config.url](), config);
  }

  if (mockResponse) {
    config.adapter = async () => mockResponse;
  }

  return config;
});

export default axiosInstance;