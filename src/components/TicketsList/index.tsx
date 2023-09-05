import { AppDispatch } from '../../redux/store';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useDispatch } from 'react-redux';
import { getAllTickets } from '../../redux/slices/tickets';
import { useEffect } from 'react';
import TicketsItem from '../TicketsItem';

function TicketsList() {
  const dispatch: AppDispatch = useDispatch();

  const { tickets, status, error } = useTypedSelector((state) => state.tickets);

  useEffect(() => {
    dispatch(getAllTickets());
  }, []);

  return (
    <div className="tickets">
      {/* Билеты */}
      {status === 'success' && tickets ? (
        tickets.map((ticket, i) => <TicketsItem ticket={ticket} key={i} />)
      ) : status === 'success' && !tickets ? (
        <div>Нет билетов</div>
      ) : null}
      {/* Загрузка */}
      {status === 'loading' ? <div>Загрузка билетов...</div> : null}
      {/* Ошибки */}
      {status === 'error' && error ? <div>Произошла ошибка {error.message}</div> : null}
    </div>
  );
}

export default TicketsList;
