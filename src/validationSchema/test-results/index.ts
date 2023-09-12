import * as yup from 'yup';

export const testResultValidationSchema = yup.object().shape({
  vulnerability: yup.string().required(),
  severity: yup.string().required(),
  description: yup.string().nullable(),
  test_run_id: yup.string().nullable().required(),
});
