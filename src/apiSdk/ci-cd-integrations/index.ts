import axios from 'axios';
import queryString from 'query-string';
import { CiCdIntegrationInterface, CiCdIntegrationGetQueryInterface } from 'interfaces/ci-cd-integration';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getCiCdIntegrations = async (
  query?: CiCdIntegrationGetQueryInterface,
): Promise<PaginatedInterface<CiCdIntegrationInterface>> => {
  const response = await axios.get('/api/ci-cd-integrations', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createCiCdIntegration = async (ciCdIntegration: CiCdIntegrationInterface) => {
  const response = await axios.post('/api/ci-cd-integrations', ciCdIntegration);
  return response.data;
};

export const updateCiCdIntegrationById = async (id: string, ciCdIntegration: CiCdIntegrationInterface) => {
  const response = await axios.put(`/api/ci-cd-integrations/${id}`, ciCdIntegration);
  return response.data;
};

export const getCiCdIntegrationById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/ci-cd-integrations/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteCiCdIntegrationById = async (id: string) => {
  const response = await axios.delete(`/api/ci-cd-integrations/${id}`);
  return response.data;
};
