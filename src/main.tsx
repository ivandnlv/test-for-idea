import 'react-app-polyfill/stable';
import 'react-app-polyfill/ie11';
import 'regenerator-runtime/runtime';
//@ts-ignore
import ReactDOM from 'react-dom';
import App from './components/App';

import { Provider } from 'react-redux';
import store from './redux/store';

import './index.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>,
);
