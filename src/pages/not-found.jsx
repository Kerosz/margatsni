import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function NotFound() {
  const location = useLocation();

  useEffect(() => {
    document.title = `Not Found - Instagram`;
  }, []);

  return (
    <div className="bg-gray-background">
      <div className="mx-auto max-w-screen-lg">
        <p className="text-center text-2xl">
          No page found at this path <code>{location.pathname}</code>
        </p>
      </div>
    </div>
  );
}
