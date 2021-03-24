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
import Header from './components/header';

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
const NotificationsPage = lazy(() => import('./pages/account/notifications'));
const PrivacyAndSecurityPage = lazy(() =>
  import('./pages/account/privacy-and-security'),
);
const PostPage = lazy(() => import('./pages/post'));
const InboxPage = lazy(() => import('./pages/inbox'));
const ExplorePage = lazy(() => import('./pages/explore'));
const SuggestedPage = lazy(() => import('./pages/explore/suggested'));

export default function App() {
  const { user } = useUserContext();

  return (
    <Router>
      <Suspense fallback={<Header />}>
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

          <ProtectedRoute user={user} path={ROUTES.INBOX}>
            <InboxPage />
          </ProtectedRoute>

          <Route
            path={ROUTES.RESET_PASSWORD}
            component={ResetPasswordPage}
            exact
          />

          <ProtectedRoute user={user} path={ROUTES.NOTIFICATIONS} exact>
            <NotificationsPage />
          </ProtectedRoute>

          <ProtectedRoute user={user} path={ROUTES.PRIVACY_AND_SECURITY} exact>
            <PrivacyAndSecurityPage />
          </ProtectedRoute>

          <ProtectedRoute user={user} path={ROUTES.EXPLORE} exact>
            <ExplorePage />
          </ProtectedRoute>

          <ProtectedRoute user={user} path={ROUTES.SUGGESTIONS} exact>
            <SuggestedPage />
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

          <Route path={ROUTES.POST} component={PostPage} exact />

          <Route path="*" component={NotFoundPage} />
        </Switch>
      </Suspense>
    </Router>
  );
}
