import axios from 'axios';
import queryString from 'query-string';
import { TestResultInterface, TestResultGetQueryInterface } from 'interfaces/test-result';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getTestResults = async (
  query?: TestResultGetQueryInterface,
): Promise<PaginatedInterface<TestResultInterface>> => {
  const response = await axios.get('/api/test-results', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createTestResult = async (testResult: TestResultInterface) => {
  const response = await axios.post('/api/test-results', testResult);
  return response.data;
};

export const updateTestResultById = async (id: string, testResult: TestResultInterface) => {
  const response = await axios.put(`/api/test-results/${id}`, testResult);
  return response.data;
};

export const getTestResultById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/test-results/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteTestResultById = async (id: string) => {
  const response = await axios.delete(`/api/test-results/${id}`);
  return response.data;
};
