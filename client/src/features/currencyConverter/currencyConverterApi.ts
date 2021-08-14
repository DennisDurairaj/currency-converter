import axios from 'axios';

export const getAllCurrencies = async () => {
  try {
    const response = await axios.get('/currencies');
    return response.data;
  } catch (e) {
    console.log(e);
  }
};
