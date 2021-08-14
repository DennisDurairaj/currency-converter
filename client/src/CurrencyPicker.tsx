import { ChevronDownIcon } from '@chakra-ui/icons';
import { Button, Box, List, ListItem, HStack, Text } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import CurrencyFlag from './CurrencyFlag';

interface Props {}

const CurrencyPicker = (props: Props) => {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const ref = useRef() as React.MutableRefObject<HTMLDivElement>;

  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (isOpened && ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpened(false);
      }
    };
    document.addEventListener('mousedown', checkIfClickedOutside);
    return () => {
      document.removeEventListener('mousedown', checkIfClickedOutside);
    };
  });

  function toggleDropdown(event: React.MouseEvent<HTMLButtonElement>) {
    setIsOpened((prev) => !prev);
  }
  return (
    <Box ref={ref} minW={{ base: '120px' }} maxW={{ base: '100px' }} p="2">
      <Button onClick={toggleDropdown} variant="outline" className="currencySelectButton">
        <CurrencyFlag countryCode="US" />
        <span>&nbsp;USD</span>
        <ChevronDownIcon />
      </Button>
      {isOpened && (
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
      )}
    </Box>
  );
};

export default CurrencyPicker;
