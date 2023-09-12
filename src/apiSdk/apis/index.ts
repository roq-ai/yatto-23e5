import axios from 'axios';
import queryString from 'query-string';
import { ApiInterface, ApiGetQueryInterface } from 'interfaces/api';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getApis = async (query?: ApiGetQueryInterface): Promise<PaginatedInterface<ApiInterface>> => {
  const response = await axios.get('/api/apis', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createApi = async (api: ApiInterface) => {
  const response = await axios.post('/api/apis', api);
  return response.data;
};

export const updateApiById = async (id: string, api: ApiInterface) => {
  const response = await axios.put(`/api/apis/${id}`, api);
  return response.data;
};

export const getApiById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/apis/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteApiById = async (id: string) => {
  const response = await axios.delete(`/api/apis/${id}`);
  return response.data;
};
