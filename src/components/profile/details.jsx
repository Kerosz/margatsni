import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import { Link } from 'react-router-dom';
import { Image } from 'cloudinary-react';
import useFirestoreUser from '../../hooks/use-firestore-user';
import {
  updateUserFollowersField,
  updateUserFollowingField,
} from '../../services/firebase';
import * as ROUTES from '../../constants/routes';

export default function Details({ profileData, postCount }) {
  const { user } = useFirestoreUser();

  const [showFollowButton, setShowFollowButton] = useState(false);
  const [isFollowingProfile, setIsFollowingProfile] = useState(false);
  const [followerCount, setFollowerCount] = useState(0);

  function handleToggleFollowUser() {
    setIsFollowingProfile((prevFollowingState) => !prevFollowingState);
    setFollowerCount((prevFollowerCount) =>
      isFollowingProfile ? prevFollowerCount - 1 : prevFollowerCount + 1,
    );

    updateUserFollowersField(
      profileData.docId,
      user.userId,
      isFollowingProfile,
    );
    updateUserFollowingField(
      profileData.userId,
      user.userId,
      isFollowingProfile,
    );
  }

  useEffect(() => {
    if (user.username) {
      const isFollowing = profileData.followers.includes(user.userId);
      const showButton = user.username !== profileData.username;

      setIsFollowingProfile(!!isFollowing);
      setShowFollowButton(!!showButton);
      setFollowerCount(profileData.followers.length);
    }
  }, [user, profileData]);

  if (!user.username) {
    return (
      <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
        <div className="container flex justify-center">
          <Skeleton circle height={160} width={160} className="mr-3" />
        </div>
        <Skeleton height={180} width={400} className="col-span-2" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
      <div className="container flex justify-center">
        <Image
          cloudName={process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}
          publicId={profileData.photoURL}
          alt={`${profileData.username} profile`}
          width="160"
          crop="scale"
          className="rounded-full h-40 w-40 flex mr-3"
        />
      </div>
      <div className="flex items-center justify-center flex-col col-span-2">
        <div className="container flex items-center">
          <p className="mr-6 text-3xl text-gray-800 font-light">
            {profileData.username}
          </p>
          {showFollowButton ? (
            <button
              type="button"
              aria-label={isFollowingProfile ? 'Unfollow' : 'Follow'}
              onClick={handleToggleFollowUser}
              className="bg-blue-medium font-bold text-sm text-white rounded w-20 h-8"
            >
              {isFollowingProfile ? 'Unfollow' : 'Follow'}
            </button>
          ) : (
            <Link
              to={ROUTES.ACCOUNT}
              aria-label="Edit profile"
              className="bg-gray-background text-black-light rounded border border-gray-primary text-sm font-semibold py-1.5 px-2"
            >
              Edit Profile
            </Link>
          )}
        </div>
        <div className="container flex mt-5">
          {!profileData.followers || !profileData.following ? (
            <Skeleton count={1} width={670} height={25} />
          ) : (
            <>
              <p className="mr-11 text-lg">
                <span className="font-bold text-gray-800 mr-0.5">
                  {postCount}
                </span>{' '}
                {postCount === 1 ? 'post' : 'posts'}
              </p>
              <p className="mr-11 text-lg">
                <span className="font-bold text-gray-800 mr-0.5">
                  {followerCount}
                </span>{' '}
                {followerCount === 1 ? 'follower' : 'followers'}
              </p>
              <p className="text-lg">
                <span className="font-bold text-gray-800 mr-0.5">
                  {profileData.following.length}
                </span>{' '}
                following
              </p>
            </>
          )}
        </div>
        <div className="container flex mt-6">
          <p className="font-semibold text-lg text-gray-900">
            {profileData.userInfo.fullName}
          </p>
        </div>
      </div>
    </div>
  );
}

Details.propTypes = {
  profileData: PropTypes.shape({
    dateCreated: PropTypes.number.isRequired,
    docId: PropTypes.string.isRequired,
    followers: PropTypes.arrayOf(PropTypes.string).isRequired,
    following: PropTypes.arrayOf(PropTypes.string).isRequired,
    userInfo: PropTypes.shape({
      bio: PropTypes.string.isRequired,
      fullName: PropTypes.string.isRequired,
      phoneNumber: PropTypes.string.isRequired,
      website: PropTypes.string.isRequired,
    }).isRequired,
    photoURL: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  }).isRequired,
  postCount: PropTypes.number.isRequired,
};
