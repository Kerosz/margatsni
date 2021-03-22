import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import SuggestedProfile from './suggested-profile';
import { getSuggestedProfilesByUserId } from '../../services/firebase';
import { SUGGESTIONS } from '../../constants/routes';

export default function Suggestions({ userData, userFollowing }) {
  const [profiles, setProfiles] = useState(null);

  useEffect(() => {
    async function getSuggestedProfiles() {
      const response = await getSuggestedProfilesByUserId(
        userData.userId,
        userFollowing,
      );

      setProfiles(response);
    }

    if (userData.userId) {
      getSuggestedProfiles();
    }
  }, [userData.userId, userFollowing]);

  if (!profiles) {
    return <Skeleton count={1} height={300} className="mt-7" />;
  }

  return (
    <div className="flex flex-col rounded">
      <div className="flex items-center align-items justify-between mb-5">
        <p className="font-semibold text-gray-500 text-sm">
          Suggestions For You
        </p>
        <Link to={SUGGESTIONS} className="text-xs py-1 px-2 font-semibold">
          See All
        </Link>
      </div>
      <div className="grid gap-4">
        {profiles.map((profile) => (
          <SuggestedProfile
            key={profile.docId}
            suggestedUser={profile}
            currentUser={userData}
          />
        ))}
      </div>
    </div>
  );
}

Suggestions.defaultProps = {
  userData: null,
  userFollowing: null,
};

Suggestions.propTypes = {
  userData: PropTypes.shape({
    userId: PropTypes.string,
    username: PropTypes.string,
    photoURL: PropTypes.string,
  }),
  userFollowing: PropTypes.arrayOf(PropTypes.string),
};
