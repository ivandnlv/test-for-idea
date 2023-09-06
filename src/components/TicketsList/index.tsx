import { AppDispatch } from '../../redux/store';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useDispatch } from 'react-redux';
import { getAllTickets } from '../../redux/slices/tickets';
import { useEffect, useState } from 'react';
import TicketsItem from '../TicketsItem';
import { Ticket } from '../../types';

function TicketsList() {
  const dispatch: AppDispatch = useDispatch();

  const [filteredTickets, setFilteredTickets] = useState<Ticket[] | null>(null);

  const {
    tickets,
    status,
    error,
    filters: { stopsFilters, currency, rubToEur, rubToUsd },
  } = useTypedSelector((state) => state.tickets);

  useEffect(() => {
    dispatch(getAllTickets());
  }, []);

  useEffect(() => {
    if (tickets && (stopsFilters?.length || currency !== 'rub')) {
      setFilteredTickets(
        tickets
          .filter((ticket) => (stopsFilters?.length ? stopsFilters.includes(ticket.stops) : ticket))
          .map((ticket) => ({
            ...ticket,
            price:
              currency === 'eur'
                ? ticket.price * rubToEur
                : currency === 'usd'
                ? ticket.price * rubToUsd
                : ticket.price,
          })),
      );
    } else {
      setFilteredTickets(null);
    }
  }, [stopsFilters, currency]);

  return (
    <div className="tickets">
      {/* Билеты */}
      {status === 'success' && tickets && !filteredTickets ? (
        tickets.map((ticket, i) => <TicketsItem ticket={ticket} key={i} />)
      ) : status === 'success' && !tickets ? (
        <div>Нет билетов</div>
      ) : null}
      {filteredTickets
        ? filteredTickets.map((filteredTicket, i) => (
            <TicketsItem ticket={filteredTicket} key={i} />
          ))
        : null}
      {/* Загрузка */}
      {status === 'loading' ? <div>Загрузка билетов...</div> : null}
      {/* Ошибки */}
      {status === 'error' && error ? <div>Произошла ошибка {error.message}</div> : null}
    </div>
  );
}

export default TicketsList;
