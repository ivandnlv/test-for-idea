import { Ticket } from '../types';

async function getTickets(): Promise<Ticket[]> {
  try {
    const data = await fetch('../../tickets.json');
    const items = await data.json();

    return items.tickets;
  } catch (error) {
    throw new Error('Произошла ошибка при загрузке данных');
  }
}

export { getTickets };
