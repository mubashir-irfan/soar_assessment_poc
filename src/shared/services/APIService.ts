import { axiosInstance } from '.';
import { AxiosHeaderValue, AxiosResponse } from 'axios';

export type QueryParams = Record<
  string,
  string | number | number[] | boolean | boolean[] | undefined | null
>;

const getCommonHeaders = (customHeaders?: Record<string, AxiosHeaderValue>) => {
  return { headers: { ...customHeaders } }; // Remove auth token for simplicity
};

const filterQueryParams = (params: QueryParams | undefined) => {
  if (!params) {
    return {};
  }
  return Object.keys(params).reduce(
    (filteredParams, key) => {
      const value = params[key];
      if (value !== null && value !== undefined && value !== '') {
        filteredParams[key] = value;
      }
      return filteredParams;
    },
    {} as Record<string, string | number | number[] | boolean | boolean[]>
  );
};

const ApiService = {
  get: <T>(
    url: string,
    params?: QueryParams,
    customHeaders?: Record<string, AxiosHeaderValue>
  ): Promise<AxiosResponse<T>> =>
    axiosInstance.get(url, {
      ...getCommonHeaders(customHeaders),
      params: filterQueryParams(params),
    }),

  post: <T, D>(
    url: string,
    data?: D,
    customHeaders?: Record<string, AxiosHeaderValue>
  ): Promise<T> =>
    axiosInstance.post<D, T>(url, JSON.stringify(data ?? {}), {
      ...getCommonHeaders(customHeaders),
    }),

  put: <T, D>(url: string, data: D, customHeaders?: Record<string, AxiosHeaderValue>): Promise<T> =>
    axiosInstance.put<D, T>(url, JSON.stringify(data), {
      ...getCommonHeaders({
        ...customHeaders,
      }),
    }),

  delete: <T, D>(
    url: string,
    data?: D,
    customHeaders?: Record<string, AxiosHeaderValue>
  ): Promise<T> => {
    return axiosInstance.delete<T, T>(url, {
      ...getCommonHeaders({ ...customHeaders }),
      data: data,
    });
  },
};

export default ApiService;
