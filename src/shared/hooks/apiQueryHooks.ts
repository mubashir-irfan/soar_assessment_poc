import { useQuery, useMutation, UseQueryResult, UseMutationResult } from '@tanstack/react-query';
import {APIService} from '../services';
import { AxiosError, AxiosResponse } from 'axios';

export const useGet = <T>(url: string, queryKey: string): UseQueryResult<T, AxiosError> => {
  return useQuery<AxiosResponse<T>, AxiosError, T>({
    queryKey: [queryKey],
      // @ts-expect-error type inference issue
    queryFn: async () => (await APIService.get<T>(url)).data,
  });
};

export const usePost = <T, D>(url: string): UseMutationResult<T, AxiosError, D> => {
  return useMutation<T, AxiosError, D>({
    mutationFn: async (data: D) => (await APIService.post<T, D>(url, data)),
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