import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

/**
 * Component used to redirect logged in users from pages that are ment to be acces by unauthorized users only
 *
 * @component
 *
 * @param {object} user The user object used to check for access clearence
 * @param {string} loggedInPath The path used to redirect the user to if he's logged in
 *
 * @example
 * const LoginPage = lazy(() => import('./pages/login'));
 *
 * <ProtectedRoute user={user} path="/dashboard">
 *   <LoginPage />
 * <ProtectedRoute />
 */
export default function UserRedirectRoute({
  user,
  loggedInPath,
  children,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (!user) return children;

        if (user) {
          return (
            <Redirect
              to={{
                pathname: loggedInPath,
                state: { referrer: location },
              }}
            />
          );
        }

        return null;
      }}
    />
  );
}

UserRedirectRoute.defaultProps = {
  user: null,
};

UserRedirectRoute.propTypes = {
  user: PropTypes.objectOf(PropTypes.any),
  loggedInPath: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
