import { ChevronDownIcon } from '@chakra-ui/icons';
import { Button, Box, List, ListItem, HStack, Text } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import CustomCurrencyFlag from './CustomCurrencyFlag';

interface Currency {
  iso: string;
  currency_name: string;
  is_obsolete: boolean;
}
type Props = {
  currencies: Currency[];
  default: Currency;
};

const CurrencyPicker: React.FC<Props> = (props) => {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>(
    props.default
  );

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

  function selectCurrency(currency: Currency) {
    setSelectedCurrency(currency);
    setIsOpened((prev) => !prev);
  }
  return (
    <Box ref={ref} minW={{ base: '120px' }} maxW={{ base: '100px' }} p="2">
      <Button
        w="100px"
        p="4px"
        onClick={toggleDropdown}
        variant="outline"
        className="currencySelectButton"
      >
        <HStack spacing="0" alignItems="center">
          <CustomCurrencyFlag countryCode={selectedCurrency.iso} />
          <span>&nbsp;{selectedCurrency.iso}</span>
          <ChevronDownIcon />
        </HStack>
      </Button>
      {isOpened && (
        <Box
          p="3"
          minW={{ base: '200px' }}
          boxShadow="md"
          borderWidth="1px"
          borderRadius="md"
          className="clickableList"
        >
          <List spacing={4}>
            {props.currencies.map((currency) => {
              return (
                <ListItem
                  onClick={() => selectCurrency(currency)}
                  key={currency.iso}
                >
                  <HStack alignItems="center">
                    <CustomCurrencyFlag countryCode={currency.iso} />
                    <div>
                      <div>{currency.iso}</div>
                      <Text fontSize="xs" color="gray.500">
                        {currency.currency_name}
                      </Text>
                    </div>
                  </HStack>
                </ListItem>
              );
            })}
          </List>
        </Box>
      )}
    </Box>
  );
};

export default CurrencyPicker;
