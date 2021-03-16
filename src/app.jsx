import { lazy, Suspense } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { useUserContext } from './context/user';
import ProtectedRoute from './helpers/protected-route';
import UserRedirectRoute from './helpers/user-redirect-route';
import * as ROUTES from './constants/routes';

const DashboardPage = lazy(() => import('./pages/dashboard'));
const LoginPage = lazy(() => import('./pages/login'));
const SignUpPage = lazy(() => import('./pages/sign-up'));
const NotFoundPage = lazy(() => import('./pages/not-found'));
const ProfilePage = lazy(() => import('./pages/profile'));
const EditProfilePage = lazy(() => import('./pages/account/edit'));
const ChangePasswordPage = lazy(() =>
  import('./pages/account/password/change'),
);
const ResetPasswordPage = lazy(() => import('./pages/account/password/reset'));
const PrivacyAndSecurityPage = lazy(() =>
  import('./pages/account/privacy-and-security'),
);

export default function App() {
  const { user } = useUserContext();

  return (
    <Router>
      <Suspense fallback={<p>Loading...</p>}>
        <Switch>
          <ProtectedRoute user={user} path={ROUTES.DASHBOARD} exact>
            <DashboardPage />
          </ProtectedRoute>

          <Route path={ROUTES.ACCOUNT} exact>
            <Redirect to={ROUTES.EDIT_PROFILE} />
          </Route>

          <Route path={ROUTES.PASSWORD} exact>
            <Redirect to={ROUTES.CHANGE_PASSWORD} />
          </Route>

          <ProtectedRoute user={user} path={ROUTES.EDIT_PROFILE} exact>
            <EditProfilePage />
          </ProtectedRoute>

          <ProtectedRoute user={user} path={ROUTES.CHANGE_PASSWORD} exact>
            <ChangePasswordPage />
          </ProtectedRoute>

          <Route
            path={ROUTES.RESET_PASSWORD}
            component={ResetPasswordPage}
            exact
          />

          <ProtectedRoute user={user} path={ROUTES.PRIVACY_AND_SECURITY} exact>
            <PrivacyAndSecurityPage />
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
