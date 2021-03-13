import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useUserContext } from './context/user';
import * as ROUTES from './constants/routes';
import ProtectedRoute from './helpers/protected-route';
import UserRedirectRoute from './helpers/user-redirect-route';

const DashboardPage = lazy(() => import('./pages/dashboard'));
const LoginPage = lazy(() => import('./pages/login'));
const SignUpPage = lazy(() => import('./pages/sign-up'));
const NotFoundPage = lazy(() => import('./pages/not-found'));
const ProfilePage = lazy(() => import('./pages/profile'));
const AccountPage = lazy(() => import('./pages/account'));

export default function App() {
  const { user } = useUserContext();

  return (
    <Router>
      <Suspense fallback={<p>Loading...</p>}>
        <Switch>
          <ProtectedRoute user={user} path={ROUTES.DASHBOARD} exact>
            <DashboardPage />
          </ProtectedRoute>
          <ProtectedRoute user={user} path={ROUTES.ACCOUNT} exact>
            <AccountPage />
          </ProtectedRoute>
          <UserRedirectRoute
            user={user}
            path={ROUTES.LOGIN}
            loggedInPath={ROUTES.DASHBOARD}
            exact
          >
            <LoginPage />
          </UserRedirectRoute>
          <UserRedirectRoute
            user={user}
            path={ROUTES.SIGNUP}
            loggedInPath={ROUTES.DASHBOARD}
            exact
          >
            <SignUpPage />
          </UserRedirectRoute>
          <Route path={ROUTES.PROFILE} component={ProfilePage} exact />
          <Route path="*" component={NotFoundPage} />
        </Switch>
      </Suspense>
    </Router>
  );
}
