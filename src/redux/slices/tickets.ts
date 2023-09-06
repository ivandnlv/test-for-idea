import { PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { Ticket, Filters } from '../../types';
import { getTickets } from '../../services/getTickets';

export const getAllTickets = createAsyncThunk('tickets/getAllTickets', async (_, { dispatch }) => {
  try {
    const items = await getTickets();

    let stopValues: number[] = [];

    items.forEach((item) => {
      if (item.stops && !stopValues.includes(item.stops)) {
        stopValues.push(item.stops);
      }
    });

    dispatch(changeStopsValues(stopValues.sort()));

    return items;
  } catch (error) {
    throw new Error('Произошла ошибка при попытке получить данные о билетах');
  }
});

interface State {
  tickets: Ticket[] | null;
  status: 'loading' | 'error' | 'success';
  error: any | null;
  filters: Filters;
}

const initialFilters: Filters = {
  currency: 'rub',
  stopsFilters: [],
  stopsValues: [],
  rubToEur: 0.009,
  rubToUsd: 0.01,
};

const initialState: State = {
  status: 'loading',
  tickets: null,
  error: null,
  filters: initialFilters,
};

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    setCurrencies(state, action: PayloadAction<{ rubToEur: number; rubToUsd: number }>) {
      const { rubToEur, rubToUsd } = action.payload;
      state.filters.rubToEur = rubToEur;
      state.filters.rubToUsd = rubToUsd;
    },
    changeCurrencyFilter(state, action: PayloadAction<Filters['currency']>) {
      state.filters.currency = action.payload;
    },
    addStopsFilter(state, action: PayloadAction<number | 'all'>) {
      if (action.payload === 'all' && state.filters.stopsValues) {
        state.filters.stopsFilters = [...state.filters.stopsValues, 'all', 0];
        return;
      }

      if (state.filters.stopsFilters) {
        state.filters.stopsFilters.push(action.payload);
      } else {
        state.filters.stopsFilters = [action.payload];
      }
    },
    removeStopsFilter(state, action: PayloadAction<number | 'all'>) {
      if (action.payload === 'all' && state.filters.stopsFilters) {
        state.filters.stopsFilters = initialFilters.stopsFilters;
      }

      if (state.filters.stopsFilters) {
        const stopsFiltersWithoutPayload = state.filters.stopsFilters.filter(
          (item) => item !== action.payload,
        );
        if (stopsFiltersWithoutPayload.length) {
          state.filters.stopsFilters = stopsFiltersWithoutPayload;
        } else {
          state.filters.stopsFilters = initialFilters.stopsFilters;
        }
      } else {
        state.filters.stopsFilters = initialFilters.stopsFilters;
      }
    },
    addOnlyStopFilter(state, action: PayloadAction<number | 'all'>) {
      state.filters.stopsFilters = initialFilters.stopsFilters;
      state.filters.stopsFilters = [action.payload];
    },
    changeStopsValues(state, action: PayloadAction<Filters['stopsValues']>) {
      state.filters.stopsValues = action.payload;
    },
    resetFilters(state) {
      state.filters = initialFilters;
    },
  },
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

export const {
  changeCurrencyFilter,
  addStopsFilter,
  removeStopsFilter,
  resetFilters,
  changeStopsValues,
  addOnlyStopFilter,
  setCurrencies,
} = ticketsSlice.actions;
export default ticketsSlice.reducer;
