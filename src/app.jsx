import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import * as ROUTES from './constants/routes';
import UserProvider from './context/user';

const DashboardPage = lazy(() => import('./pages/dashboard'));
const LoginPage = lazy(() => import('./pages/login'));
const SignUpPage = lazy(() => import('./pages/sign-up'));
const NotFoundPage = lazy(() => import('./pages/not-found'));

export default function App() {
  return (
    <UserProvider>
      <Router>
        <Suspense fallback={<p>Loading...</p>}>
          <Switch>
            <Route path={ROUTES.DASHBOARD} component={DashboardPage} exact />
            <Route path={ROUTES.LOGIN} component={LoginPage} exact />
            <Route path={ROUTES.SIGNUP} component={SignUpPage} exact />
            <Route path="*" component={NotFoundPage} />
          </Switch>
        </Suspense>
      </Router>
    </UserProvider>
  );
}
