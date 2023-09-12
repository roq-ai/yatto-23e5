import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';

import { createCiCdIntegration } from 'apiSdk/ci-cd-integrations';
import { ciCdIntegrationValidationSchema } from 'validationSchema/ci-cd-integrations';
import { ApiInterface } from 'interfaces/api';
import { UserInterface } from 'interfaces/user';
import { getApis } from 'apiSdk/apis';
import { getUsers } from 'apiSdk/users';
import { CiCdIntegrationInterface } from 'interfaces/ci-cd-integration';

function CiCdIntegrationCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: CiCdIntegrationInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createCiCdIntegration(values);
      resetForm();
      router.push('/ci-cd-integrations');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<CiCdIntegrationInterface>({
    initialValues: {
      name: '',
      integration_type: '',
      api_id: (router.query.api_id as string) ?? null,
      user_id: (router.query.user_id as string) ?? null,
    },
    validationSchema: ciCdIntegrationValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Ci Cd Integrations',
              link: '/ci-cd-integrations',
            },
            {
              label: 'Create Ci Cd Integration',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Ci Cd Integration
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.name}
            label={'Name'}
            props={{
              name: 'name',
              placeholder: 'Name',
              value: formik.values?.name,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.integration_type}
            label={'Integration Type'}
            props={{
              name: 'integration_type',
              placeholder: 'Integration Type',
              value: formik.values?.integration_type,
              onChange: formik.handleChange,
            }}
          />

          <AsyncSelect<ApiInterface>
            formik={formik}
            name={'api_id'}
            label={'Select Api'}
            placeholder={'Select Api'}
            fetcher={getApis}
            labelField={'name'}
          />
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            labelField={'email'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/ci-cd-integrations')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'ci_cd_integration',
    operation: AccessOperationEnum.CREATE,
  }),
)(CiCdIntegrationCreatePage);
