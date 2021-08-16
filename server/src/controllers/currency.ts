import { Request, Response, NextFunction } from "express";
import axios, { AxiosResponse } from "axios";
import { ConvertFromRequest, Currency } from "../models/CurrencyModel";

const getAllCurrencies = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let currencies: Currency[] = [
    {
      iso: "AED",
      currency_name: "Emirati Dirham",
    },
    {
      iso: "AFN",
      currency_name: "Afghan Afghani",
    },
    {
      iso: "ALL",
      currency_name: "Albanian Lek",
    },
    {
      iso: "AMD",
      currency_name: "Armenian Dram",
    },
    {
      iso: "ANG",
      currency_name: "Dutch Guilder",
    },
    {
      iso: "AOA",
      currency_name: "Angolan Kwanza",
    },
    {
      iso: "ARS",
      currency_name: "Argentine Peso",
    },
    {
      iso: "AUD",
      currency_name: "Australian Dollar",
    },
    {
      iso: "AWG",
      currency_name: "Aruban or Dutch Guilder",
    },
    {
      iso: "AZN",
      currency_name: "Azerbaijan Manat",
    },
    {
      iso: "BAM",
      currency_name: "Bosnian Convertible Mark",
    },
    {
      iso: "BBD",
      currency_name: "Barbadian or Bajan Dollar",
    },
    {
      iso: "BDT",
      currency_name: "Bangladeshi Taka",
    },
    {
      iso: "BGN",
      currency_name: "Bulgarian Lev",
    },
    {
      iso: "BHD",
      currency_name: "Bahraini Dinar",
    },
    {
      iso: "BIF",
      currency_name: "Burundian Franc",
    },
    {
      iso: "BMD",
      currency_name: "Bermudian Dollar",
    },
    {
      iso: "BND",
      currency_name: "Bruneian Dollar",
    },
    {
      iso: "BOB",
      currency_name: "Bolivian Bolíviano",
    },
    {
      iso: "BRL",
      currency_name: "Brazilian Real",
    },
    {
      iso: "BSD",
      currency_name: "Bahamian Dollar",
    },
    {
      iso: "BTN",
      currency_name: "Bhutanese Ngultrum",
    },
    {
      iso: "BWP",
      currency_name: "Botswana Pula",
    },
    {
      iso: "BYN",
      currency_name: "Belarusian Ruble",
    },
    {
      iso: "BZD",
      currency_name: "Belizean Dollar",
    },
    {
      iso: "CAD",
      currency_name: "Canadian Dollar",
    },
    {
      iso: "CDF",
      currency_name: "Congolese Franc",
    },
    {
      iso: "CHF",
      currency_name: "Swiss Franc",
    },
    {
      iso: "CLF",
      currency_name: "Chilean Unidad de Fomento",
    },
    {
      iso: "CLP",
      currency_name: "Chilean Peso",
    },
    {
      iso: "CNH",
      currency_name: "Chinese Yuan Renminbi Offshore",
    },
    {
      iso: "CNY",
      currency_name: "Chinese Yuan Renminbi",
    },
    {
      iso: "COP",
      currency_name: "Colombian Peso",
    },
    {
      iso: "CRC",
      currency_name: "Costa Rican Colon",
    },
    {
      iso: "CUC",
      currency_name: "Cuban Convertible Peso",
    },
    {
      iso: "CUP",
      currency_name: "Cuban Peso",
    },
    {
      iso: "CVE",
      currency_name: "Cape Verdean Escudo",
    },
    {
      iso: "CZK",
      currency_name: "Czech Koruna",
    },
    {
      iso: "DJF",
      currency_name: "Djiboutian Franc",
    },
    {
      iso: "DKK",
      currency_name: "Danish Krone",
    },
    {
      iso: "DOP",
      currency_name: "Dominican Peso",
    },
    {
      iso: "DZD",
      currency_name: "Algerian Dinar",
    },
    {
      iso: "EGP",
      currency_name: "Egyptian Pound",
    },
    {
      iso: "ERN",
      currency_name: "Eritrean Nakfa",
    },
    {
      iso: "ETB",
      currency_name: "Ethiopian Birr",
    },
    {
      iso: "EUR",
      currency_name: "Euro",
    },
    {
      iso: "FJD",
      currency_name: "Fijian Dollar",
    },
    {
      iso: "FKP",
      currency_name: "Falkland Island Pound",
    },
    {
      iso: "GBP",
      currency_name: "British Pound",
    },
    {
      iso: "GEL",
      currency_name: "Georgian Lari",
    },
    {
      iso: "GGP",
      currency_name: "Guernsey Pound",
    },
    {
      iso: "GHS",
      currency_name: "Ghanaian Cedi",
    },
    {
      iso: "GIP",
      currency_name: "Gibraltar Pound",
    },
    {
      iso: "GMD",
      currency_name: "Gambian Dalasi",
    },
    {
      iso: "GNF",
      currency_name: "Guinean Franc",
    },
    {
      iso: "GTQ",
      currency_name: "Guatemalan Quetzal",
    },
    {
      iso: "GYD",
      currency_name: "Guyanese Dollar",
    },
    {
      iso: "HKD",
      currency_name: "Hong Kong Dollar",
    },
    {
      iso: "HNL",
      currency_name: "Honduran Lempira",
    },
    {
      iso: "HRK",
      currency_name: "Croatian Kuna",
    },
    {
      iso: "HTG",
      currency_name: "Haitian Gourde",
    },
    {
      iso: "HUF",
      currency_name: "Hungarian Forint",
    },
    {
      iso: "IDR",
      currency_name: "Indonesian Rupiah",
    },
    {
      iso: "ILS",
      currency_name: "Israeli Shekel",
    },
    {
      iso: "IMP",
      currency_name: "Isle of Man Pound",
    },
    {
      iso: "INR",
      currency_name: "Indian Rupee",
    },
    {
      iso: "IQD",
      currency_name: "Iraqi Dinar",
    },
    {
      iso: "IRR",
      currency_name: "Iranian Rial",
    },
    {
      iso: "ISK",
      currency_name: "Icelandic Krona",
    },
    {
      iso: "JEP",
      currency_name: "Jersey Pound",
    },
    {
      iso: "JMD",
      currency_name: "Jamaican Dollar",
    },
    {
      iso: "JOD",
      currency_name: "Jordanian Dinar",
    },
    {
      iso: "JPY",
      currency_name: "Japanese Yen",
    },
    {
      iso: "KES",
      currency_name: "Kenyan Shilling",
    },
    {
      iso: "KGS",
      currency_name: "Kyrgyzstani Som",
    },
    {
      iso: "KHR",
      currency_name: "Cambodian Riel",
    },
    {
      iso: "KMF",
      currency_name: "Comorian Franc",
    },
    {
      iso: "KPW",
      currency_name: "North Korean Won",
    },
    {
      iso: "KRW",
      currency_name: "South Korean Won",
    },
    {
      iso: "KWD",
      currency_name: "Kuwaiti Dinar",
    },
    {
      iso: "KYD",
      currency_name: "Caymanian Dollar",
    },
    {
      iso: "KZT",
      currency_name: "Kazakhstani Tenge",
    },
    {
      iso: "LAK",
      currency_name: "Lao Kip",
    },
    {
      iso: "LBP",
      currency_name: "Lebanese Pound",
    },
    {
      iso: "LKR",
      currency_name: "Sri Lankan Rupee",
    },
    {
      iso: "LRD",
      currency_name: "Liberian Dollar",
    },
    {
      iso: "LSL",
      currency_name: "Basotho Loti",
    },
    {
      iso: "LYD",
      currency_name: "Libyan Dinar",
    },
    {
      iso: "MAD",
      currency_name: "Moroccan Dirham",
    },
    {
      iso: "MDL",
      currency_name: "Moldovan Leu",
    },
    {
      iso: "MGA",
      currency_name: "Malagasy Ariary",
    },
    {
      iso: "MKD",
      currency_name: "Macedonian Denar",
    },
    {
      iso: "MMK",
      currency_name: "Burmese Kyat",
    },
    {
      iso: "MNT",
      currency_name: "Mongolian Tughrik",
    },
    {
      iso: "MOP",
      currency_name: "Macau Pataca",
    },
    {
      iso: "MRU",
      currency_name: "Mauritanian Ouguiya",
    },
    {
      iso: "MUR",
      currency_name: "Mauritian Rupee",
    },
    {
      iso: "MVR",
      currency_name: "Maldivian Rufiyaa",
    },
    {
      iso: "MWK",
      currency_name: "Malawian Kwacha",
    },
    {
      iso: "MXN",
      currency_name: "Mexican Peso",
    },
    {
      iso: "MXV",
      currency_name: "Unidad de inversión",
    },
    {
      iso: "MYR",
      currency_name: "Malaysian Ringgit",
    },
    {
      iso: "MZN",
      currency_name: "Mozambican Metical",
    },
    {
      iso: "NAD",
      currency_name: "Namibian Dollar",
    },
    {
      iso: "NGN",
      currency_name: "Nigerian Naira",
    },
    {
      iso: "NIO",
      currency_name: "Nicaraguan Cordoba",
    },
    {
      iso: "NOK",
      currency_name: "Norwegian Krone",
    },
    {
      iso: "NPR",
      currency_name: "Nepalese Rupee",
    },
    {
      iso: "NZD",
      currency_name: "New Zealand Dollar",
    },
    {
      iso: "OMR",
      currency_name: "Omani Rial",
    },
    {
      iso: "PAB",
      currency_name: "Panamanian Balboa",
    },
    {
      iso: "PEN",
      currency_name: "Peruvian Sol",
    },
    {
      iso: "PGK",
      currency_name: "Papua New Guinean Kina",
    },
    {
      iso: "PHP",
      currency_name: "Philippine Peso",
    },
    {
      iso: "PKR",
      currency_name: "Pakistani Rupee",
    },
    {
      iso: "PLN",
      currency_name: "Polish Zloty",
    },
    {
      iso: "PYG",
      currency_name: "Paraguayan Guarani",
    },
    {
      iso: "QAR",
      currency_name: "Qatari Riyal",
    },
    {
      iso: "RON",
      currency_name: "Romanian Leu",
    },
    {
      iso: "RSD",
      currency_name: "Serbian Dinar",
    },
    {
      iso: "RUB",
      currency_name: "Russian Ruble",
    },
    {
      iso: "RWF",
      currency_name: "Rwandan Franc",
    },
    {
      iso: "SAR",
      currency_name: "Saudi Arabian Riyal",
    },
    {
      iso: "SBD",
      currency_name: "Solomon Islander Dollar",
    },
    {
      iso: "SCR",
      currency_name: "Seychellois Rupee",
    },
    {
      iso: "SDG",
      currency_name: "Sudanese Pound",
    },
    {
      iso: "SEK",
      currency_name: "Swedish Krona",
    },
    {
      iso: "SGD",
      currency_name: "Singapore Dollar",
    },
    {
      iso: "SHP",
      currency_name: "Saint Helenian Pound",
    },
    {
      iso: "SLL",
      currency_name: "Sierra Leonean Leone",
    },
    {
      iso: "SOS",
      currency_name: "Somali Shilling",
    },
    {
      iso: "SPL",
      currency_name: "Seborgan Luigino",
    },
    {
      iso: "SRD",
      currency_name: "Surinamese Dollar",
    },
    {
      iso: "STN",
      currency_name: "Sao Tomean Dobra",
    },
    {
      iso: "SVC",
      currency_name: "Salvadoran Colon",
    },
    {
      iso: "SYP",
      currency_name: "Syrian Pound",
    },
    {
      iso: "SZL",
      currency_name: "Swazi Lilangeni",
    },
    {
      iso: "THB",
      currency_name: "Thai Baht",
    },
    {
      iso: "TJS",
      currency_name: "Tajikistani Somoni",
    },
    {
      iso: "TMT",
      currency_name: "Turkmenistani Manat",
    },
    {
      iso: "TND",
      currency_name: "Tunisian Dinar",
    },
    {
      iso: "TOP",
      currency_name: "Tongan Pa'anga",
    },
    {
      iso: "TRY",
      currency_name: "Turkish Lira",
    },
    {
      iso: "TTD",
      currency_name: "Trinidadian Dollar",
    },
    {
      iso: "TVD",
      currency_name: "Tuvaluan Dollar",
    },
    {
      iso: "TWD",
      currency_name: "Taiwan New Dollar",
    },
    {
      iso: "TZS",
      currency_name: "Tanzanian Shilling",
    },
    {
      iso: "UAH",
      currency_name: "Ukrainian Hryvnia",
    },
    {
      iso: "UGX",
      currency_name: "Ugandan Shilling",
    },
    {
      iso: "USD",
      currency_name: "US Dollar",
    },
    {
      iso: "UYU",
      currency_name: "Uruguayan Peso",
    },
    {
      iso: "UZS",
      currency_name: "Uzbekistani Som",
    },
    {
      iso: "VEF",
      currency_name: "Venezuelan Bolívar",
    },
    {
      iso: "VES",
      currency_name: "Venezuelan Bolívar",
    },
    {
      iso: "VND",
      currency_name: "Vietnamese Dong",
    },
    {
      iso: "VUV",
      currency_name: "Ni-Vanuatu Vatu",
    },
    {
      iso: "WST",
      currency_name: "Samoan Tala",
    },
    {
      iso: "XAF",
      currency_name: "Central African CFA Franc BEAC",
    },
    {
      iso: "XAG",
      currency_name: "Silver Ounce",
    },
    {
      iso: "XAU",
      currency_name: "Gold Ounce",
    },
    {
      iso: "XBT",
      currency_name: "Bitcoin",
    },
    {
      iso: "XCD",
      currency_name: "East Caribbean Dollar",
    },
    {
      iso: "XDR",
      currency_name: "IMF Special Drawing Rights",
    },
    {
      iso: "XOF",
      currency_name: "CFA Franc",
    },
    {
      iso: "XPD",
      currency_name: "Palladium Ounce",
    },
    {
      iso: "XPF",
      currency_name: "CFP Franc",
    },
    {
      iso: "XPT",
      currency_name: "Platinum Ounce",
    },
    {
      iso: "YER",
      currency_name: "Yemeni Rial",
    },
    {
      iso: "ZAR",
      currency_name: "South African Rand",
    },
    {
      iso: "ZMW",
      currency_name: "Zambian Kwacha",
    },
    {
      iso: "ZWD",
      currency_name: "Zimbabwean Dollar",
    },
  ];
  return res.status(200).json({
    currencies,
  });
};

const convertFrom = async (
  req: Request<{}, {}, {}, ConvertFromRequest>,
  res: Response
) => {
  const { from, to, amount } = req.query;
  let convert_from = {
    terms: "http://www.xe.com/legal/dfs.php",
    privacy: "http://www.xe.com/privacy.php",
    from: "USD",
    amount: 10.0,
    timestamp: "2021-08-15T00:00:00Z",
    to: [
      {
        quotecurrency: "EUR",
        mid: 8.477348178,
      },
    ],
  };
  return res.status(200).json({
    amount,
    from,
    to,
    mid: 576575757575675765756,
  });
};

export default { getAllCurrencies, convertFrom };
