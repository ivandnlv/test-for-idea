import Header from '../UI/Header';
import TicketsList from '../TicketsList';
import FiltersComponent from '../Filters';
import { useEffect } from 'react';
import { AppDispatch } from '../../redux/store';
import { useDispatch } from 'react-redux';
import { getCurrencies } from '../../services/getCurrencies';
import { setCurrencies } from '../../redux/slices/tickets';

function App() {
  const dispatch: AppDispatch = useDispatch();

  const getAllCurrencies = async () => {
    try {
      const currencies = await getCurrencies();

      console.log(currencies.eur, currencies.usd);

      dispatch(setCurrencies({ rubToEur: currencies.eur, rubToUsd: currencies.usd }));
    } catch (error) {
      throw new Error('Не удалось получить данные о валютах');
    }
  };

  useEffect(() => {
    getAllCurrencies();
  }, []);

  return (
    <>
      <Header />
      <main className="main">
        <div className="container">
          <FiltersComponent />
          <TicketsList />
        </div>
      </main>
    </>
  );
}

export default App;
