import * as yup from 'yup';

export const testRunValidationSchema = yup.object().shape({
  start_time: yup.date().required(),
  end_time: yup.date().nullable(),
  status: yup.string().required(),
  api_id: yup.string().nullable().required(),
  user_id: yup.string().nullable().required(),
});
