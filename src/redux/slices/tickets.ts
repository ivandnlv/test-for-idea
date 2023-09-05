import { PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { Ticket } from '../../types';
import { getTickets } from '../../services/getTickets';

export const getAllTickets = createAsyncThunk('tickets/getAllTickets', async (_, {}) => {
  try {
    const items = await getTickets();

    return items;
  } catch (error) {
    throw new Error('Произошла ошибка при попытке получить данные о билетах');
  }
});

interface State {
  tickets: Ticket[] | null;
  status: 'loading' | 'error' | 'success';
  error: any | null;
}

const initialState: State = {
  status: 'loading',
  tickets: null,
  error: null,
};

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllTickets.fulfilled, (state, action: PayloadAction<State['tickets']>) => {
      state.status = 'success';
      state.error = null;
      state.tickets = action.payload;
    }),
      builder.addCase(getAllTickets.pending, (state) => {
        state.status = 'loading';
        state.error = null;
        state.tickets = null;
      });
    builder.addCase(getAllTickets.rejected, (state, action: PayloadAction<State['error']>) => {
      state.status = 'error';
      state.tickets = null;
      state.error = action.payload;
    });
  },
});

export const {} = ticketsSlice.actions;
export default ticketsSlice.reducer;
