import axios from 'axios';

export const getAllCurrencies = async () => {
  try {
    const response = await axios.get('/currencies');
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const convert = async (from: string, to: string, amount: number) => {
  try {
    const response = await axios.get('/convert', {
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
