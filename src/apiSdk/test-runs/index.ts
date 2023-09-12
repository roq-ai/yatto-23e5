import axios from 'axios';
import queryString from 'query-string';
import { TestRunInterface, TestRunGetQueryInterface } from 'interfaces/test-run';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getTestRuns = async (query?: TestRunGetQueryInterface): Promise<PaginatedInterface<TestRunInterface>> => {
  const response = await axios.get('/api/test-runs', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createTestRun = async (testRun: TestRunInterface) => {
  const response = await axios.post('/api/test-runs', testRun);
  return response.data;
};

export const updateTestRunById = async (id: string, testRun: TestRunInterface) => {
  const response = await axios.put(`/api/test-runs/${id}`, testRun);
  return response.data;
};

export const getTestRunById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/test-runs/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteTestRunById = async (id: string) => {
  const response = await axios.delete(`/api/test-runs/${id}`);
  return response.data;
};
