import { TestRunInterface } from 'interfaces/test-run';
import { GetQueryInterface } from 'interfaces';

export interface TestResultInterface {
  id?: string;
  test_run_id: string;
  vulnerability: string;
  severity: string;
  description?: string;
  created_at?: any;
  updated_at?: any;

  test_run?: TestRunInterface;
  _count?: {};
}

export interface TestResultGetQueryInterface extends GetQueryInterface {
  id?: string;
  test_run_id?: string;
  vulnerability?: string;
  severity?: string;
  description?: string;
}
