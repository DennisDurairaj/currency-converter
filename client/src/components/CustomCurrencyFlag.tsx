import CurrencyFlag from 'react-currency-flags';

interface Props {
  countryCode: string;
}

const CustomCurrencyFlag = ({ countryCode }: Props) => {
  return <CurrencyFlag currency={countryCode} height={14} />;
};

export default CustomCurrencyFlag;
