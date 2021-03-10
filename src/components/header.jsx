/* eslint-disable no-unused-vars */
import { Link } from 'react-router-dom';
import { useFirebaseContext } from '../context/firebase';
import { useUserContext } from '../context/user';
import * as ROUTES from '../constants/routes';

export default function Header() {
  const { firebase } = useFirebaseContext();
  const { user } = useUserContext();

  return (
    <header className="h-16 bg-white border-b border-gray-primary mb-8">
      <div className="container px-2.5 mx-auto max-w-screen-lg h-full">
        <div className="flex justify-between h-full">
          <div className="text-gray-700 text-center flex items-center align-items cursor-pointer">
            <h1 className="flex justify-center w-full">
              <Link
                to={ROUTES.DASHBOARD}
                aria-label="Instagram branding"
                title="Instagram branding"
              >
                <img
                  src="/images/logo.png"
                  alt="Instagram branding"
                  className="mt-2 w-6/12"
                />
              </Link>
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
}
