import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import SuggestedProfile from './suggested-profile';
import { getSuggestedProfilesByUserId } from '../../services/firebase';

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
    return <Skeleton count={1} height={180} />;
  }

  return (
    <div className="flex flex-col rounded">
      <div className="flex items-center align-items justify-between mb-5">
        <p className="font-semibold text-gray-500 text-sm">
          Suggestions For You
        </p>
      </div>
      <div className="grid gap-5">
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
