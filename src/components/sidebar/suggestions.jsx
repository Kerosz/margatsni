/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import { getSuggestedProfilesByUserId } from '../../services/firebase';

export default function Suggestions({ userId }) {
  const [profiles, setProfiles] = useState(null);

  useEffect(() => {
    async function getProfiles() {
      const response = getSuggestedProfilesByUserId(userId);

      setProfiles(response);
    }

    if (userId) {
      getProfiles();
    }
  }, []);

  if (!profiles) {
    return <Skeleton count={1} height={180} />;
  }

  return (
    <div className="flex flex-col rounded">
      <div className="flex items-center align-items justify-between mb-2 text-sm">
        <p className="font-bold text-gray-base">Suggestions for you</p>
      </div>
    </div>
  );
}

Suggestions.defaultProps = {
  userId: null,
};

Suggestions.propTypes = {
  userId: PropTypes.string,
};
