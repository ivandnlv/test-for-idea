import { Ticket } from '../../types';
import { transferFormat } from '../../utils/formatters';

import britishLogoPath from './logos/ba.svg';
import s7LogoPath from './logos/s7.png';
import suLogoPath from './logos/su.png';
import turkishLogoPath from './logos/tk.png';
import noImagePath from './logos/no-image.png';
import planeIconPath from './plane.svg';
import Btn from '../UI/Btn';
import { useTypedSelector } from '../../hooks/useTypedSelector';

interface TicketsItemProps {
  ticket: Ticket;
}

const daysOfWeek = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'];

function TicketsItem({ ticket }: TicketsItemProps) {
  const currency = useTypedSelector((state) => state.tickets.filters.currency);

  const initLogoPath = (): string => {
    switch (ticket.carrier) {
      case 'TK':
        return turkishLogoPath;
      case 'S7':
        return s7LogoPath;
      case 'SU':
        return suLogoPath;
      case 'BA':
        return britishLogoPath;
      default:
        return noImagePath;
    }
  };

  const onBuyClick = () => {
    console.log('buy');
  };

  const getDayName = (date: string) => {
    const day = new Date(date).getDay();
    return daysOfWeek[day];
  };

  return (
    <div className="ticket">
      <div className="ticket__left">
        <div className="img">
          <img src={initLogoPath()} alt={ticket.carrier} />
        </div>
        <Btn clickFunc={onBuyClick}>
          Купить за <br /> {Math.round(ticket.price).toLocaleString()}
          {currency === 'rub' ? '₽' : currency === 'usd' ? '$' : '€'}
        </Btn>
      </div>
      <div className="ticket__right">
        <div className="ticket__wrapper">
          <div className="ticket__wrapper-time">{ticket.departure_time}</div>
          <div className="ticket__wrapper-geo">
            {ticket.origin}, {ticket.origin_name}
          </div>
          <div className="ticket__wrapper-date">
            {ticket.departure_date},{getDayName(ticket.departure_date)}
          </div>
        </div>
        <div className="ticket__transfer">
          {ticket.stops ? `${ticket.stops} ${transferFormat(ticket.stops)}` : 'Без пересадок'}
          <div className="ticket__transfer-line">
            <div></div>
            <img src={planeIconPath} alt="plane" />
          </div>
        </div>
        <div className="ticket__wrapper">
          <div className="ticket__wrapper-time">{ticket.arrival_time}</div>
          <div className="ticket__wrapper-geo">
            {ticket.destination}, {ticket.destination_name}
          </div>
          <div className="ticket__wrapper-date">
            {ticket.arrival_date},{getDayName(ticket.arrival_date)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TicketsItem;
