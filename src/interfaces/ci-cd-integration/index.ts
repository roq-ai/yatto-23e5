import { ApiInterface } from 'interfaces/api';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface CiCdIntegrationInterface {
  id?: string;
  name: string;
  api_id: string;
  user_id: string;
  integration_type: string;
  created_at?: any;
  updated_at?: any;

  api?: ApiInterface;
  user?: UserInterface;
  _count?: {};
}

export interface CiCdIntegrationGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  api_id?: string;
  user_id?: string;
  integration_type?: string;
}
