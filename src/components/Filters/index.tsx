import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { AppDispatch } from '../../redux/store';
import { Filters } from '../../types';
import {
  addOnlyStopFilter,
  addStopsFilter,
  changeCurrencyFilter,
  removeStopsFilter,
} from '../../redux/slices/tickets';
import { transferFormat } from '../../utils/formatters';

function FiltersComponent() {
  const dispatch: AppDispatch = useDispatch();

  const {
    filters: { currency, stopsValues, stopsFilters },
  } = useTypedSelector((state) => state.tickets);

  const currencies: Filters['currency'][] = ['rub', 'usd', 'eur'];

  const onTabClick = (value: Filters['currency']) => {
    dispatch(changeCurrencyFilter(value));
  };

  const onCheckboxChange = (stopValue: 'all' | number) => {
    if (stopsFilters?.includes(stopValue)) {
      dispatch(removeStopsFilter(stopValue));
    } else {
      dispatch(addStopsFilter(stopValue));
    }
  };

  const onButtonClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    stopValue: 'all' | number,
  ) => {
    e.preventDefault();
    dispatch(addOnlyStopFilter(stopValue));
  };

  return (
    <div className="filters">
      <div className="filters__currencies">
        <div className="filters__currencies-title">Валюта</div>
        <div className="filters__currencies-tabs">
          {currencies.map((item, i) =>
            item === currency ? (
              <button className="_selected" onClick={() => onTabClick(item)} key={i}>
                {item}
              </button>
            ) : (
              <button key={i} onClick={() => onTabClick(item)}>
                {item}
              </button>
            ),
          )}
        </div>
      </div>
      <div className="filters__stops">
        <div className="filters__stops-title">Количество пересадок</div>
        <form className="filters__stops-checkboxes">
          {stopsValues ? (
            <>
              <label className="filters__stops-checkbox">
                <input
                  type="checkbox"
                  onChange={() => onCheckboxChange('all')}
                  checked={stopsFilters?.includes('all') ?? false}
                />
                <span>Все</span>
              </label>
              <label className="filters__stops-checkbox">
                <input
                  type="checkbox"
                  onChange={() => onCheckboxChange(0)}
                  checked={stopsFilters?.includes(0)}
                />
                <span>Без пересадок</span>
                <button onClick={(e) => onButtonClick(e, 0)}>Только</button>
              </label>
              {stopsValues.map((stop, i) => (
                <label className="filters__stops-checkbox" key={i}>
                  <input
                    type="checkbox"
                    onChange={() => onCheckboxChange(stop)}
                    checked={stopsFilters?.includes(stop) ?? false}
                  />
                  <span>
                    {stop} {transferFormat(stop)}
                  </span>
                  <button onClick={(e) => onButtonClick(e, stop)}>Только</button>
                </label>
              ))}
            </>
          ) : (
            <>
              <label className="filters__stops-checkbox">
                <input
                  type="checkbox"
                  onChange={() => onCheckboxChange('all')}
                  checked={stopsFilters?.includes('all') ?? false}
                />
                <span>Все</span>
                <button onClick={(e) => onButtonClick(e, 'all')}>Только</button>
              </label>
              <label className="filters__stops-checkbox">
                <input
                  type="checkbox"
                  onChange={() => onCheckboxChange(0)}
                  checked={stopsFilters?.includes(0) ?? false}
                />
                <span>Без пересадок</span>
                <button onClick={(e) => onButtonClick(e, 0)}>Только</button>
              </label>
            </>
          )}
        </form>
      </div>
    </div>
  );
}

export default FiltersComponent;
