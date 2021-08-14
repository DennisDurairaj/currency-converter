import { Box, Flex, Input } from '@chakra-ui/react';
import './App.css';
import CurrencyPicker from './CurrencyPicker';

function App() {
  return (
    <div className="wrapper">
      <Flex justifyContent="center">
        <CurrencyPicker />

        <Box flexGrow={1} maxW={{ base: '350px' }} p="2">
          <Input w="100%" placeholder="Basic usage" />
        </Box>
      </Flex>
    </div>
  );
}

export default App;
