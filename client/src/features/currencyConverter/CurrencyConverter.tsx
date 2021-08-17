import {
  Box,
  Button,
  Input,
  Stat,
  StatLabel,
  StatNumber,
  Text,
  FormControl,
  FormLabel,
  Spinner,
} from '@chakra-ui/react';
import React from 'react';
import { useQuery } from 'react-query';
import CurrencyPicker from '../../components/CurrencyPicker/CurrencyPicker';
import { convert, getAllCurrencies } from './currencyConverterApi';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { format } from '../../helpers';
import styles from './CurrencyConverter.module.css';
import clsx from 'clsx';
interface Inputs {
  currencyFrom: string;
  currencyTo: string;
  amount: string;
}

const CurrencyConverter: React.FC = () => {
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

  return (
    <Box
      as="main"
      justifyContent={['start', 'center']}
      className={styles.container}
    >
      {currenciesQuery.isLoading === true ? (
        <Spinner size="xl" />
      ) : (
        <>
          <Box className={styles.heading} as="h1">
            Currency Converter
          </Box>
          <Box
            className={styles.form}
            as="form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Box className={styles.conversionContainer} as="div">
              <FormControl>
                <FormLabel
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  From
                </FormLabel>
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
              </FormControl>
              <FormControl>
                <FormLabel
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  To
                </FormLabel>
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
              </FormControl>

              <Box className={styles.amountInput}>
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
                    <FormControl>
                      <FormLabel>Amount</FormLabel>
                      <Input
                        maxLength={12}
                        isInvalid={errors.amount && true}
                        errorBorderColor="red.300"
                        {...field}
                        onBlur={onBlurHandler}
                        autoComplete="off"
                      />
                    </FormControl>
                  )}
                />
                {errors.amount && (
                  <Text color="red.300" overflowWrap="anywhere" fontSize="sm">
                    {errors.amount.message}
                  </Text>
                )}
              </Box>
              <Box as="div" className={styles.submitResult}>
                <Button
                  disabled={
                    watchAmount.length === 0 || parseInt(watchAmount) === 0
                  }
                  type="submit"
                  colorScheme="blue"
                >
                  Convert
                </Button>
                {conversionQuery.isFetched && (
                  <Stat
                    className={clsx(styles.conversionResultData, {
                      [styles.fadeIn]: conversionQuery.isFetched,
                    })}
                  >
                    <StatLabel color="gray.500">
                      {format(conversionQuery.data.amount).toLocaleString()}{' '}
                      {conversionQuery.data.from} =
                    </StatLabel>
                    <StatNumber overflowWrap="anywhere" color="green.400">
                      {format(
                        conversionQuery.data.mid.toFixed(4)
                      ).toLocaleString()}{' '}
                      {conversionQuery.data.to}
                    </StatNumber>
                  </Stat>
                )}
              </Box>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

export default CurrencyConverter;
