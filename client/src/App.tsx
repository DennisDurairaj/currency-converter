import { Flex, Heading } from '@chakra-ui/react';
import './App.css';
import CurrencyConverter from './features/CurrencyConverter/CurrencyConverter';

function App() {
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
        <CurrencyConverter />
      </Flex>
    </div>
  );
}

export default App;
