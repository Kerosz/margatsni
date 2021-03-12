import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import Header from '../components/header';

export default function NotFound() {
  useEffect(() => {
    document.title = `Not Found - Instagram`;
  }, []);

  return (
    <div className="bg-gray-background">
      <Header />
      <div className="mx-auto max-w-screen-lg">
        <p className="text-center text-2xl font-semibold text-gray-800">
          Sorry, this page isn't available.
        </p>
        <p className="text-center mt-10">
          The link you followed may be broken, or the page may have been
          removed.{' '}
          <Link to={ROUTES.DASHBOARD} className="text-blue-medium">
            Go back to Instagram.
          </Link>
        </p>
      </div>
    </div>
  );
}
