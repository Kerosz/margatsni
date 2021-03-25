import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import CloudinaryImage from '../cloudinary-image';
import Modal from '../modal';
import useSendNotification from '../../hooks/use-send-notification';
import useDisclosure from '../../hooks/use-disclosure';
import {
  updateUserFollowersField,
  updateUserFollowingField,
  createRoom,
} from '../../services/firebase';
import * as ROUTES from '../../constants/routes';

export default function Details({ profileData, postCount, userData }) {
  const history = useHistory();
  const notify = useSendNotification(profileData.userId);

  const { isOpen, onClose, onOpen } = useDisclosure();

  const [showFollowButton, setShowFollowButton] = useState(null);
  const [isFollowingProfile, setIsFollowingProfile] = useState(false);
  const [followerCount, setFollowerCount] = useState(0);
  const [submittingMessage, setSubmittingMessage] = useState(false);

  async function handleToggleFollowUser() {
    setIsFollowingProfile((prevFollowingState) => !prevFollowingState);
    setFollowerCount((prevFollowerCount) =>
      isFollowingProfile ? prevFollowerCount - 1 : prevFollowerCount + 1,
    );

    onClose();

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

  async function handleSendMessage() {
    setSubmittingMessage(true);
    const roomId = uuid();

    await createRoom({
      dateCreated: Date.now(),
      dateUpdated: Date.now(),
      messages: [],
      roomParticipants: [userData.userId, profileData.userId],
      roomId,
    });

    history.push(`/direct/inbox/${roomId}`);

    notify(
      {
        recieverId: profileData.userId,
        senderPhotoURL: userData.photoURL,
        senderUsername: userData.username,
        notificationType: 'MESSAGE_NOTIFICATION',
        message: 'added you to a chat.',
        targetLink: `/direct/inbox/${roomId}`,
      },
      'chatAdd',
    );

    setSubmittingMessage(false);
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
    <div className="grid sm:grid-cols-3 grid-cols-4 gap-4 justify-between mx-auto max-w-screen-lg">
      <div className="container flex justify-center col-span-2 sm:col-auto">
        <CloudinaryImage
          src={profileData.photoURL}
          alt={`${profileData.username} profile`}
          size="165"
          type="profile"
          className="rounded-full w-32 h-32 sm:h-40 sm:w-40 min-w-max mr-3"
        />
      </div>
      <div className="flex items-center justify-center flex-col col-span-2">
        <div className="container flex sm:items-center sm:flex-row flex-col items-start">
          <div className="flex sm:mr-4">
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
          </div>
          {userData.userId ? (
            <>
              <div className="flex">
                {isFollowingProfile && showFollowButton && (
                  <button
                    type="button"
                    aria-label={`Message ${profileData.username}`}
                    onClick={handleSendMessage}
                    disabled={submittingMessage}
                    className={`bg-gray-background text-black-light rounded border border-gray-primary text-sm font-semibold py-1.5 sm:mr-2.5 px-2.5 sm:mt-1 mt-3 w-full sm:w-max text-center mr-2 ${
                      submittingMessage && 'opacity-50 cursor-not-allowed'
                    }`}
                  >
                    {submittingMessage ? 'Sending...' : 'Message'}
                  </button>
                )}
                {isFollowingProfile && showFollowButton && (
                  <button
                    type="button"
                    aria-label="Unfollow"
                    onClick={onOpen}
                    className="bg-gray-background text-black-light rounded border border-gray-primary text-sm font-semibold py-2 sm:pl-3.5 sm:pr-3 pl-2 pr-1.5 sm:mt-1 mt-3 w-full sm:w-max flex justify-center"
                  >
                    <svg
                      className="w-4 text-black-light"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <svg
                      className="w-3.5 text-green-600 -ml-0.5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </button>
                )}
              </div>
              {!isFollowingProfile && showFollowButton && (
                <button
                  type="button"
                  aria-label="Follow"
                  onClick={handleToggleFollowUser}
                  className="bg-blue-medium font-bold text-sm py-1.5 px-3 text-white rounded sm:mt-1 mt-3 w-full sm:w-max text-center"
                >
                  Follow
                </button>
              )}
              {!showFollowButton && (
                <Link
                  to={ROUTES.ACCOUNT}
                  aria-label="Edit profile"
                  className="bg-gray-background text-black-light rounded border border-gray-primary text-sm font-semibold py-1.5 px-2 sm:mt-1 mt-3 w-full sm:w-max text-center"
                >
                  Edit Profile
                </Link>
              )}
              <Modal
                isOpen={isOpen}
                onClose={onClose}
                maxW="sm"
                showHeader={false}
                className="rounded-xl"
              >
                <div className="flex flex-col items-center pt-5">
                  <CloudinaryImage
                    src={profileData.photoURL}
                    alt={`${profileData.username} profile`}
                    size="125"
                    type="profile"
                    className="rounded-full w-24 h-24 min-w-max"
                  />
                  <p className="text-black-light text-sm mt-6">
                    Unfollow @{profileData.username}?
                  </p>
                  <button
                    type="button"
                    aria-label="Unfollow"
                    onClick={handleToggleFollowUser}
                    className="text-red-primary border-t border-b border-gray-primary w-full mt-6 py-2.5 px-2 font-bold text-sm"
                  >
                    Unfollow
                  </button>
                </div>
              </Modal>
            </>
          ) : null}
        </div>
        <div className="container flex mt-5 sm:space-x-8 sm:flex-row flex-col space-y-1 sm:space-y-0">
          {!profileData.followers || !profileData.following ? (
            <Skeleton count={1} width={670} height={25} />
          ) : (
            <>
              <p className="text-lg">
                <span className="font-bold text-gray-800 mr-0.5">
                  {postCount}
                </span>{' '}
                {postCount === 1 ? 'post' : 'posts'}
              </p>
              <p className="text-lg">
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
