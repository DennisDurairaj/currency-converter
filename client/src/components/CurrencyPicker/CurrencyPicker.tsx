import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Box,
  List,
  ListItem,
  HStack,
  Text,
  Input,
  InputGroup,
  InputRightElement,
  InputLeftAddon,
} from '@chakra-ui/react';
import clsx from 'clsx';
import React, { useEffect, useRef, useState } from 'react';
import { Path, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import CustomCurrencyFlag from '../CustomCurrencyFlag';
import styles from './CurrencyPicker.module.css';

interface Currency {
  iso: string;
  currency_name: string;
  is_obsolete: boolean;
}
type Props = {
  currencies: Currency[];
  defaultCurrency: Currency;
  label: Path<Inputs>;
  register: UseFormRegister<Inputs>;
  required: boolean;
  setValue: UseFormSetValue<Inputs>;
};

interface Inputs {
  currencyFrom: string;
  currencyTo: string;
  amount: string;
}

const CurrencyPicker: React.FC<Props> = ({
  currencies,
  defaultCurrency,
  label,
  register,
  required,
  setValue,
}) => {
  const [isOpened, setIsOpened] = useState<boolean | null>(null);
  const [selectedCurrency, setSelectedCurrency] =
    useState<Currency>(defaultCurrency);

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

  function toggleDropdown(event: React.MouseEvent<HTMLInputElement>) {
    setIsOpened((prev) => !prev);
  }

  function selectCurrency(currency: Currency) {
    setValue(label, currency.iso);
    setSelectedCurrency(currency);
    setIsOpened((prev) => !prev);
  }
  return (
    <Box ref={ref}>
      <InputGroup>
        <InputLeftAddon
          children={<CustomCurrencyFlag countryCode={selectedCurrency.iso} />}
        />
        <Input
          {...register(label, { required })}
          isReadOnly
          onClick={toggleDropdown}
          value={selectedCurrency.iso}
        />
        <InputRightElement children={<ChevronDownIcon color="gray.500" />} />
      </InputGroup>
      {isOpened !== null && (
        <Box
          p="3"
          boxShadow="md"
          borderWidth="1px"
          borderRadius="md"
          className={clsx(styles.currencyList, {
            [styles.fadeIn]: isOpened,
            [styles.fadeOut]: !isOpened,
          })}
        >
          <List spacing={4}>
            {currencies.map((currency) => {
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

export default React.memo(CurrencyPicker);
