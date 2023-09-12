import { TestResultInterface } from 'interfaces/test-result';
import { ApiInterface } from 'interfaces/api';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface TestRunInterface {
  id?: string;
  api_id: string;
  user_id: string;
  start_time?: any;
  end_time?: any;
  status: string;
  created_at?: any;
  updated_at?: any;
  test_result?: TestResultInterface[];
  api?: ApiInterface;
  user?: UserInterface;
  _count?: {
    test_result?: number;
  };
}

export interface TestRunGetQueryInterface extends GetQueryInterface {
  id?: string;
  api_id?: string;
  user_id?: string;
  status?: string;
}
