import { render } from 'react-dom';
import FirebaseProvider from './context/firebase';
import App from './app';

import './styles/app.css';

render(
  <FirebaseProvider>
    <App />
  </FirebaseProvider>,
  document.getElementById('root'),
);
