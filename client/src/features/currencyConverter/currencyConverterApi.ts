import axios from 'axios';
import API_URL from '../../config';

export const getAllCurrencies = async () => {
  try {
    const response = await axios.get(`${API_URL}/currencies`);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const convert = async (from: string, to: string, amount: number) => {
  try {
    const response = await axios.get(`${API_URL}/convert`, {
      params: {
        from,
        to,
        amount,
      },
    });
    return response.data;
  } catch (e) {
    console.log(e);
  }
};
