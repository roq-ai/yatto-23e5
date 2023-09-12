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

import { createTestResult } from 'apiSdk/test-results';
import { testResultValidationSchema } from 'validationSchema/test-results';
import { TestRunInterface } from 'interfaces/test-run';
import { getTestRuns } from 'apiSdk/test-runs';
import { TestResultInterface } from 'interfaces/test-result';

function TestResultCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: TestResultInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createTestResult(values);
      resetForm();
      router.push('/test-results');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<TestResultInterface>({
    initialValues: {
      vulnerability: '',
      severity: '',
      description: '',
      test_run_id: (router.query.test_run_id as string) ?? null,
    },
    validationSchema: testResultValidationSchema,
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
              label: 'Test Results',
              link: '/test-results',
            },
            {
              label: 'Create Test Result',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Test Result
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.vulnerability}
            label={'Vulnerability'}
            props={{
              name: 'vulnerability',
              placeholder: 'Vulnerability',
              value: formik.values?.vulnerability,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.severity}
            label={'Severity'}
            props={{
              name: 'severity',
              placeholder: 'Severity',
              value: formik.values?.severity,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.description}
            label={'Description'}
            props={{
              name: 'description',
              placeholder: 'Description',
              value: formik.values?.description,
              onChange: formik.handleChange,
            }}
          />

          <AsyncSelect<TestRunInterface>
            formik={formik}
            name={'test_run_id'}
            label={'Select Test Run'}
            placeholder={'Select Test Run'}
            fetcher={getTestRuns}
            labelField={'status'}
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
              onClick={() => router.push('/test-results')}
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
    entity: 'test_result',
    operation: AccessOperationEnum.CREATE,
  }),
)(TestResultCreatePage);
