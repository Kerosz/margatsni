import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import useDebounce from '../hooks/use-debounce';
import CloudinaryImage from './cloudinary-image';
import { getUserDataByKeyword } from '../services/firebase';

export default function SearchBar({ className, isBottom }) {
  const [resultState, setResult] = useState(null);
  const [searchTermState, setSearchTerm] = useState('');

  const debouncedSearchTerm = useDebounce(searchTermState, 500);

  async function getSearchResults(keyword) {
    const results = await getUserDataByKeyword(keyword);

    if (results) {
      setResult(results);
    }
  }

  useEffect(() => {
    if (debouncedSearchTerm.length >= 3) {
      getSearchResults(debouncedSearchTerm);
    } else {
      setResult(null);
    }
  }, [debouncedSearchTerm]);

  return (
    <div
      className={`w-full relative ${className}`}
      style={{ maxWidth: '225px' }}
    >
      <svg
        className="w-3 text-gray-400 absolute top-2.5 left-2.5"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="3"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      <input
        type="text"
        placeholder="Search"
        className="w-full px-2 pl-7 py-1  focus:ring-gray-600 focus:border-gray-400 bg-gray-50 border border-gray-primary rounded text-sm"
        value={searchTermState}
        onChange={({ target }) => setSearchTerm(target.value)}
      />

      {resultState && (
        <ul
          className={`absolute bg-white w-full py-3 max-w-sm ${
            isBottom ? 'bottom-9' : 'top-8'
          } shadow-md rounded border border-gray-100`}
          style={{ minWidth: '300px' }}
        >
          {resultState.length === 0 && (
            <div className="flex flex-col items-center my-5">
              <svg
                className="w-14 text-gray-700"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-black-light mt-3 text-lg">No Results Found</p>
            </div>
          )}
          {resultState.map((result) => (
            <li key={result.userId} className="hover:bg-gray-50 px-3 py-1.5">
              <Link to={`/u/${result.username}`} className="flex items-center">
                <CloudinaryImage
                  src={result.photoURL}
                  alt={`${result.username} profile`}
                  size="42"
                  type="profile"
                  className="rounded-full h-10 w-10 flex mr-3.5"
                />

                <div className="flex flex-col">
                  <div className="flex">
                    <p className="font-semibold text-sm mb-0.5 max-w-max">
                      {result.username}
                    </p>
                    {result.verifiedUser && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-3 mt-0.5 ml-0.5 opacity-90 text-blue-medium"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>

                  <p className="text-sm text-gray-500">
                    {result.userInfo.fullName}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

SearchBar.defaultProps = {
  className: null,
  isBottom: false,
};

SearchBar.propTypes = {
  className: PropTypes.string,
  isBottom: PropTypes.bool,
};
