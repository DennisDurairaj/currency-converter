import React from 'react';
import ReactCountryFlag from 'react-country-flag';

interface Props {
  countryCode: string;
}

const CurrencyFlag = ({ countryCode }: Props) => {
  return (
    <ReactCountryFlag
      style={{
        width: 'auto',
        height: '1.2em',
        boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px;',
      }}
      countryCode={countryCode}
      svg
    />
  );
};

export default CurrencyFlag;
