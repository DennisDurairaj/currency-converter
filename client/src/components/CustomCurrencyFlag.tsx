import React from 'react';
import ReactCountryFlag from 'react-country-flag';
import CurrencyFlag from 'react-currency-flags';

interface Props {
  countryCode: string;
}

const CustomCurrencyFlag = ({ countryCode }: Props) => {
  return (
    <CurrencyFlag currency={countryCode} height={14} />
    // <ReactCountryFlag
    //   style={{
    //     width: 'auto',
    //     height: '1.2em',
    //     boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px;',
    //   }}
    //   countryCode={countryCode}
    //   svg
    // />
  );
};

export default CustomCurrencyFlag;
