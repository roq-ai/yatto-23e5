import * as yup from 'yup';

export const ciCdIntegrationValidationSchema = yup.object().shape({
  name: yup.string().required(),
  integration_type: yup.string().required(),
  api_id: yup.string().nullable().required(),
  user_id: yup.string().nullable().required(),
});
