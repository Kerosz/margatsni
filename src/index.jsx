import { render } from 'react-dom';
import FirebaseProvider from './context/firebase';
import UserProvider from './context/user';
import App from './app';

import './styles/app.css';

render(
  <FirebaseProvider>
    <UserProvider>
      <App />
    </UserProvider>
  </FirebaseProvider>,
  document.getElementById('root'),
);
