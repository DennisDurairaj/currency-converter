import { ArrowDownIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, Input, Heading } from '@chakra-ui/react';
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
      <Flex direction="column" align="center" h="100%" justify="center">
        <Heading
          className="heading"
          fontSize={['36px', '48px']}
          as="h1"
          flexGrow={0.2}
        >
          Currency Converter
        </Heading>
        <Flex>
          <CurrencyPicker
            currencies={currenciesQuery.data.currencies}
            default={{ iso: 'EUR', currency_name: 'Euro', is_obsolete: false }}
          />
          <Box p="2">
            <Input placeholder="From" />
          </Box>
        </Flex>
        {/* <ArrowDownIcon color="blue.500" w={8} h={8} /> */}
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
            <Input placeholder="To" />
          </Box>
        </Flex>
        <Button colorScheme="blue">Convert</Button>
      </Flex>
    </div>
  );
}

export default App;
