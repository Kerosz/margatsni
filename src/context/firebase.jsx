import { createContext, useContext } from 'react';
import { firebase, FieldValue } from '../lib/firebase';
import { __DEV__ } from '../constants/env';

const FirebaseContext = createContext(null);

if (__DEV__) {
  FirebaseContext.displayName = `FirebaseContext`;
}

const FirebaseProvider = (props) => (
  <FirebaseContext.Provider
    value={{ firebase, FieldValue }}
    {...props}
  />
);

/**
 * A hook for fast access to `firebase context`
 *
 * @returns {{firebase: object; FieldValue: object}}
 */
export const useFirebaseContext = () => useContext(FirebaseContext);

export default FirebaseProvider;
