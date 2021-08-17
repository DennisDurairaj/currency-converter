import { Request, Response, NextFunction } from "express";
import axios, { AxiosError, AxiosResponse } from "axios";
import {
  ConvertFromRequest,
  ConvertFromResponse,
  CurrenciesResponse,
  Currency,
} from "../models/CurrencyModel";

const getAllCurrencies = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result: AxiosResponse<CurrenciesResponse> = await axios.get(
      `https://xecdapi.xe.com/v1/currencies.json/`
    );
    return res.status(200).json({
      currencies: result.data.currencies,
    });
  } catch (e) {
    res.status(e.response.status).json({
      message: e.response.data.message,
    });
  }
};

const convertFrom = async (
  req: Request<{}, {}, {}, ConvertFromRequest>,
  res: Response
) => {
  const { from, to, amount } = req.query;
  try {
    const result: AxiosResponse<ConvertFromResponse> = await axios.get(
      `https://xecdapi.xe.com/v1/convert_from.json/`,
      {
        params: {
          from,
          to,
          amount,
        },
      }
    );

    return res.status(200).json({
      amount,
      from,
      to,
      mid: result.data.to[0].mid,
    });
  } catch (e) {
    res.status(e.response.status).json({
      message: e.response.data.message,
    });
  }
};

export default { getAllCurrencies, convertFrom };
