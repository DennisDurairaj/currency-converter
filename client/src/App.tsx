import { Box, Flex, Input } from '@chakra-ui/react';
import { useQuery } from 'react-query';
import './App.css';
import CurrencyPicker from './CurrencyPicker';
import { getAllCurrencies } from './features/currencyConverter/currencyConverterApi';

function App() {
  const currenciesQuery = useQuery('currencies', getAllCurrencies, {
    refetchOnWindowFocus: false,
  });

  if (currenciesQuery.isLoading === true) {
    return <p>Loading...</p>;
  }

  return (
    <div className="wrapper">
      <Flex direction="column" align="center">
        <Flex>
          <CurrencyPicker
            currencies={currenciesQuery.data.currencies}
            default={{ iso: 'EUR', currency_name: 'Euro', is_obsolete: false }}
          />
          <Box p="2">
            <Input placeholder="Amount" />
          </Box>
        </Flex>
        <Flex>
          <CurrencyPicker
            currencies={currenciesQuery.data.currencies}
            default={{
              iso: 'USD',
              currency_name: 'US dollar',
              is_obsolete: false,
            }}
          />
          <Box p="2">
            <Input placeholder="Amount" />
          </Box>
        </Flex>
      </Flex>
    </div>
  );
}

export default App;
