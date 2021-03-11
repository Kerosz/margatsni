import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import * as ROUTES from '../constants/routes';

/**
 * Component used to protect a route from unauthorized users by checking if the user passed in exists
 *
 * @component
 *
 * @param {object} user The user object used to check for access clearence
 *
 * @example
 * const DashboardPage = lazy(() => import('./pages/dashboard'));
 *
 * <ProtectedRoute user={user} path="/dashboard">
 *   <DashboardPage />
 * <ProtectedRoute />
 */
export default function ProtectedRoute({ user, children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (user) return children;

        if (!user) {
          return (
            <Redirect
              to={{
                pathname: ROUTES.LOGIN,
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

ProtectedRoute.defaultProps = {
  user: null,
};

ProtectedRoute.propTypes = {
  user: PropTypes.objectOf(PropTypes.any),
  children: PropTypes.node.isRequired,
};
