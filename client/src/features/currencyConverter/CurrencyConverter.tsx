import {
  Box,
  Button,
  VStack,
  Input,
  Stat,
  StatLabel,
  StatNumber,
  Flex,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { useQuery } from 'react-query';
import CurrencyPicker from '../../components/CurrencyPicker';
import { convert, getAllCurrencies } from './currencyConverterApi';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { format } from '../../helpers';

interface Props {}

interface Inputs {
  currencyFrom: string;
  currencyTo: string;
  amount: string;
}

const CurrencyConverter: React.FC<Props> = (props) => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    mode: 'onChange',
    defaultValues: {
      amount: '1',
      currencyFrom: 'EUR',
      currencyTo: 'USD',
    },
  });

  const watchAmount = watch('amount');

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data, errors);
    conversionQuery.refetch();
  };

  const currenciesQuery = useQuery('currencies', getAllCurrencies, {
    refetchOnWindowFocus: false,
  });

  const conversionQuery = useQuery(
    ['conversion'],
    () =>
      convert(
        getValues().currencyFrom,
        getValues().currencyTo,
        format(getValues().amount)
      ),
    {
      enabled: false,
      keepPreviousData: true,
    }
  );

  const onBlurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.value.length === 0 || /\d/.test(e.target.value) === false) {
      return '0';
    }
    setValue('amount', format(e.target.value).toLocaleString());
  };

  if (currenciesQuery.isLoading === true) {
    return <p>Loading...</p>;
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack align="stretch" spacing={8}>
        <CurrencyPicker
          currencies={currenciesQuery.data.currencies}
          defaultCurrency={{
            iso: 'EUR',
            currency_name: 'Euro',
            is_obsolete: false,
          }}
          label="currencyFrom"
          register={register}
          required
          setValue={setValue}
        />
        <CurrencyPicker
          currencies={currenciesQuery.data.currencies}
          defaultCurrency={{
            iso: 'USD',
            currency_name: 'US dollar',
            is_obsolete: false,
          }}
          label="currencyTo"
          register={register}
          required
          setValue={setValue}
        />
        <Box>
          <Controller
            control={control}
            name="amount"
            rules={{
              required: {
                value: true,
                message: 'Please enter an amount',
              },
              maxLength: {
                value: 15,
                message: 'Amount should be less than 100,000,000,000',
              },
              pattern: {
                value: /\d/,
                message: 'Please enter a valid number',
              },
            }}
            render={({ field }) => (
              <>
                <Input
                  maxLength={15}
                  isInvalid={errors.amount && true}
                  errorBorderColor="red.300"
                  {...field}
                  onBlur={onBlurHandler}
                  autoComplete="off"
                />
              </>
            )}
          />
          {errors.amount && (
            <Text color="red.300" overflowWrap="anywhere" fontSize="sm">
              {errors.amount.message}
            </Text>
          )}
        </Box>
        <Flex
          wrap="wrap"
          alignItems="center"
          justify="space-between"
          alignSelf="flex-start"
          w="100%"
        >
          <Button
            disabled={watchAmount.length === 0}
            type="submit"
            colorScheme="blue"
          >
            Convert
          </Button>
          {conversionQuery.data && (
            <Stat p="2">
              <StatLabel color="gray.500">
                {format(conversionQuery.data.amount).toLocaleString()}{' '}
                {conversionQuery.data.from} =
              </StatLabel>
              <StatNumber overflowWrap="anywhere" color="green.400">
                {format(conversionQuery.data.mid.toFixed(4)).toLocaleString()}{' '}
                {conversionQuery.data.to}
              </StatNumber>
            </Stat>
          )}
        </Flex>
      </VStack>
    </form>
  );
};

CurrencyConverter.whyDidYouRender = {
  logOnDifferentValues: true,
  customName: 'CurrencyConverter',
};

export default CurrencyConverter;
