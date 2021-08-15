import { Box, Button, VStack, Input } from '@chakra-ui/react';
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
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      amount: '1',
      currencyFrom: 'EUR',
      currencyTo: 'USD',
    },
  });
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    conversionQuery.refetch();
  };

  const currenciesQuery = useQuery('currencies', getAllCurrencies, {
    refetchOnWindowFocus: false,
  });

  const conversionQuery = useQuery(
    [
      'conversion',
      getValues().currencyFrom,
      getValues().currencyTo,
      getValues().amount,
    ],
    () =>
      convert(
        getValues().currencyFrom,
        getValues().currencyTo,
        format(getValues().amount)
      ),
    {
      enabled: false,
    }
  );

  const onBlurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.value.length === 0) {
      return '0';
    }
    setValue('amount', format(e.target.value).toLocaleString());
  };

  if (currenciesQuery.isLoading === true) {
    return <p>Loading...</p>;
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing={8}>
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
        <Box w="100%">
          <Controller
            control={control}
            name="amount"
            render={({ field }) => (
              <Input autoComplete="false" {...field} onBlur={onBlurHandler} />
            )}
          />
        </Box>
        <Button
          disabled={getValues().amount.length === 0}
          type="submit"
          colorScheme="blue"
        >
          Convert
        </Button>
      </VStack>
    </form>
  );
};

CurrencyConverter.whyDidYouRender = {
  logOnDifferentValues: true,
  customName: 'CurrencyConverter',
};

export default CurrencyConverter;
