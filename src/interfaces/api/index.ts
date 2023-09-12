import { CiCdIntegrationInterface } from 'interfaces/ci-cd-integration';
import { TestRunInterface } from 'interfaces/test-run';
import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface ApiInterface {
  id?: string;
  name: string;
  format: string;
  organization_id: string;
  created_at?: any;
  updated_at?: any;
  ci_cd_integration?: CiCdIntegrationInterface[];
  test_run?: TestRunInterface[];
  organization?: OrganizationInterface;
  _count?: {
    ci_cd_integration?: number;
    test_run?: number;
  };
}

export interface ApiGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  format?: string;
  organization_id?: string;
}
