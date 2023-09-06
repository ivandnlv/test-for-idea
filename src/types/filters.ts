type Currencies = 'rub' | 'usd' | 'eur';

export interface Filters {
  currency: Currencies;
  stopsFilters: (number | 'all')[] | null;
  stopsValues: number[] | null;
  rubToUsd: number;
  rubToEur: number;
}
