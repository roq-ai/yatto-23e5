import * as yup from 'yup';

export const apiValidationSchema = yup.object().shape({
  name: yup.string().required(),
  format: yup.string().required(),
  organization_id: yup.string().nullable().required(),
});
