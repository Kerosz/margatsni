import { lazy, Suspense } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import * as ROUTES from './constants/routes';

const LoginPage = lazy(() => import('./pages/login'));

export default function App() {
  return (
    <Router>
      <Suspense fallback={<p>Loading...</p>}>
        <Switch>
          <Route path={ROUTES.LOGIN} component={LoginPage} />
        </Switch>
      </Suspense>
    </Router>
  );
}
