import axios from 'axios';

async function getCurrencies(): Promise<Currencies['rub']> {
  try {
    const { data } = await axios.get(
      'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/rub.json',
    );

    return data.rub;
  } catch (error) {
    throw new Error('Произошла ошибка при попытке получить данные курсов валют');
  }
}

export { getCurrencies };
