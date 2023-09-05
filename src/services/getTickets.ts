import axios from 'axios';
import { Ticket } from '../types';

async function getTickets(): Promise<Ticket[]> {
  try {
    const { data } = await axios.get('../../tickets.json');

    return data.tickets;
  } catch (error) {
    throw new Error('Произошла ошибка при загрузке данных');
  }
}

export { getTickets };
