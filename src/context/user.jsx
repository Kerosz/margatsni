import { createContext, useContext } from 'react';
import { __DEV__ } from '../constants/env';
import useAuthListener from '../hooks/use-auth-listener';

const UserContext = createContext(null);

if (__DEV__) {
  UserContext.displayName = `UserContext`;
}

const UserProvider = (props) => {
  const { user } = useAuthListener();

  return <UserContext.Provider value={{ user }} {...props} />;
};

/**
 * A hook for fast access to the authentificated user context data
 *
 * @returns {object} A user object
 */
export const useUserContext = () => useContext(UserContext);

export default UserProvider;
