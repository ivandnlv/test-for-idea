import 'react-app-polyfill/stable';
import 'react-app-polyfill/ie11';
import 'regenerator-runtime/runtime';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import store from './redux/store';

import App from './components/App';

import './index.scss';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>,
);
