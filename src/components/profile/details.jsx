/* eslint-disable no-nested-ternary */
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import { Link } from 'react-router-dom';
import {
  updateUserFollowersField,
  updateUserFollowingField,
} from '../../services/firebase';
import * as ROUTES from '../../constants/routes';
import CloudinaryImage from '../cloudinary-image';
import useSendNotification from '../../hooks/use-send-notification';

export default function Details({ profileData, postCount, userData }) {
  const notify = useSendNotification(profileData.userId);

  const [showFollowButton, setShowFollowButton] = useState(null);
  const [isFollowingProfile, setIsFollowingProfile] = useState(false);
  const [followerCount, setFollowerCount] = useState(0);

  async function handleToggleFollowUser() {
    setIsFollowingProfile((prevFollowingState) => !prevFollowingState);
    setFollowerCount((prevFollowerCount) =>
      isFollowingProfile ? prevFollowerCount - 1 : prevFollowerCount + 1,
    );

    await updateUserFollowersField(
      profileData.docId,
      userData.userId,
      isFollowingProfile,
    );
    await updateUserFollowingField(
      profileData.userId,
      userData.userId,
      isFollowingProfile,
    );

    if (!isFollowingProfile) {
      notify(
        {
          recieverId: profileData.userId,
          senderPhotoURL: userData.photoURL,
          senderUsername: userData.username,
          notificationType: 'FOLLOW_NOTIFICATION',
          message: 'started following you.',
          targetLink: `/u/${userData.username}`,
        },
        'follow',
      );
    }
  }

  useEffect(() => {
    if (userData.username) {
      const isFollowing = profileData.followers.includes(userData.userId);
      const showButton = userData.username !== profileData.username;

      setIsFollowingProfile(!!isFollowing);
      setShowFollowButton(!!showButton);
      setFollowerCount(profileData.followers.length);
    }
  }, [userData, profileData]);

  return (
    <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
      <div className="container flex justify-center">
        <CloudinaryImage
          src={profileData.photoURL}
          alt={`${profileData.username} profile`}
          size="165"
          type="profile"
          className="rounded-full h-40 w-40 flex mr-3"
        />
      </div>
      <div className="flex items-center justify-center flex-col col-span-2">
        <div className="container flex items-center">
          <p className="mr-1.5 text-3xl text-gray-800 font-light">
            {profileData.username}
          </p>
          {profileData.verifiedUser && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-6 mt-2 opacity-90 text-blue-medium mr-1"
            >
              <path
                fillRule="evenodd"
                d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          )}
          {userData.userId ? (
            showFollowButton ? (
              <button
                type="button"
                aria-label={isFollowingProfile ? 'Unfollow' : 'Follow'}
                onClick={handleToggleFollowUser}
                className="bg-blue-medium font-bold text-sm text-white rounded w-20 h-8 mt-1 ml-6"
              >
                {isFollowingProfile ? 'Unfollow' : 'Follow'}
              </button>
            ) : (
              <Link
                to={ROUTES.ACCOUNT}
                aria-label="Edit profile"
                className="bg-gray-background text-black-light rounded border border-gray-primary text-sm font-semibold py-1.5 px-2 mt-1 ml-6"
              >
                Edit Profile
              </Link>
            )
          ) : null}
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
        <div className="container flex mt-5 items-center">
          <p className="font-semibold text-base text-gray-900">
            {profileData.userInfo.fullName}
          </p>
        </div>
        {profileData.userInfo.bio && (
          <div className="container flex items-center">
            <p className="text-base text-gray-900">
              {profileData.userInfo.bio}
            </p>
          </div>
        )}
        {profileData.userInfo.website && (
          <div className="container flex items-center">
            <a
              href={profileData.userInfo.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-800 font-semibold"
            >
              {profileData.userInfo.website.replace(
                /http(s)?(:)?(\/\/)?|(\/\/)?(www\.)?/g,
                '',
              )}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

Details.defaultProps = {
  userData: null,
};

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
    verifiedUser: PropTypes.bool.isRequired,
  }).isRequired,
  postCount: PropTypes.number.isRequired,
  userData: PropTypes.shape({
    dateCreated: PropTypes.number,
    docId: PropTypes.string,
    followers: PropTypes.arrayOf(PropTypes.string),
    following: PropTypes.arrayOf(PropTypes.string),
    userInfo: PropTypes.shape({
      bio: PropTypes.string,
      fullName: PropTypes.string,
      phoneNumber: PropTypes.string,
      website: PropTypes.string,
    }),
    photoURL: PropTypes.string,
    userId: PropTypes.string,
    username: PropTypes.string,
    verifiedUser: PropTypes.bool,
  }),
};
