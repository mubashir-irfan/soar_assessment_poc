import { useQuery, useMutation, UseQueryResult, UseMutationResult } from '@tanstack/react-query';
import {APIService} from '../services';
import { AxiosError, AxiosHeaderValue, AxiosResponse } from 'axios';

type RequestPayload<T> = T;

interface APIError {
  error?: string;
  message?: string;
  errorCode?: string;
  statusCode: number;
  entitlementCode?: string;
}

export const useGet = <T>(url: string, queryKey: string): UseQueryResult<T, AxiosError> => {
  return useQuery<AxiosResponse<T>, AxiosError, T>({
    queryKey: [queryKey],
      queryFn: async () => {
      console.log('useGet got request', url, queryKey)
       return await APIService.get(url)
      } 
  });
};

export const usePost = <T, D>(
  url: string,
  onSuccess: (response: T, variables: D) => void,
  onError?: (error: AxiosError<APIError>, variables: D) => void,
  customHeaders?: Record<string, AxiosHeaderValue>,
) => {
  return useMutation({
    mutationFn: async (data?: RequestPayload<D>): Promise<T> => await APIService.post(url, data, customHeaders),
    onSuccess,
    onError,
  });
};

export const usePut = <T, D>(url: string): UseMutationResult<T, AxiosError, D> => {
  return useMutation<T, AxiosError, D>({
    mutationFn: async (data: D) => (await APIService.put<T, D>(url, data)),
  });
};

export const useDelete = <T, D>(url: string): UseMutationResult<T, AxiosError, D> => {
  return useMutation<T, AxiosError, D>({
    mutationFn: async (data: D) => (await APIService.delete<T, D>(url, data)),
  });
};