import { Box, Button, Flex, HStack, Input, List, ListItem, Text } from '@chakra-ui/react';
import React from 'react';
import './App.css';
import { ChevronDownIcon } from '@chakra-ui/icons';
import CurrencyFlag from './CurrencyFlag';

function App() {
  return (
    <div className="wrapper">
      <Flex justifyContent="center">
        <Box minW={{ base: '120px' }} maxW={{ base: '100px' }} p="2">
          <Button variant="outline" className="currencySelectButton">
            <CurrencyFlag countryCode="US" />
            <span>&nbsp;USD</span>
            <ChevronDownIcon />
          </Button>
          <Box p="3" minW={{ base: '150px' }} boxShadow="md" borderWidth="1px" borderRadius="md" className="clickableList">
            <List spacing={4}>
              <ListItem>
                <HStack>
                  <CurrencyFlag countryCode="US" />
                  <div>
                    <div>USD</div>
                    <Text fontSize="xs" color="gray.500">
                      US dollar
                    </Text>
                  </div>
                </HStack>
              </ListItem>
              <ListItem>
                <HStack>
                  <CurrencyFlag countryCode="PL" />
                  <div>
                    <div>PLN</div>
                    <Text fontSize="xs" color="gray.500">
                      Polish Zloty
                    </Text>
                  </div>
                </HStack>
              </ListItem>
              <ListItem>
                <HStack>
                  <CurrencyFlag countryCode="EU" />
                  <div>
                    <div>EUR</div>
                    <Text fontSize="xs" color="gray.500">
                      Euro
                    </Text>
                  </div>
                </HStack>
              </ListItem>
            </List>
          </Box>
        </Box>

        <Box flexGrow={1} maxW={{ base: '350px' }} p="2">
          <Input w="100%" placeholder="Basic usage" />
        </Box>
      </Flex>
    </div>
  );
}

export default App;
