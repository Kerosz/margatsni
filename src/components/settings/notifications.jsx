import { useState } from 'react';
import PropTypes from 'prop-types';
import Toast from '../toast';
import useUpdateEffect from '../../hooks/use-update-effect';
import useDisclosure from '../../hooks/use-disclosure';
import { updateUserNotificationField } from '../../services/firebase';

export default function Notifications({ notificationData, userDocId }) {
  const {
    like,
    follow,
    chatAdd,
    chatDelete,
    chatLeave,
    message,
  } = notificationData;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [postLikeState, setPostLike] = useState(like);
  const [profileFollow, setProfileFollow] = useState(follow);
  const [chatRoomAdded, setChatRoomAdded] = useState(chatAdd);
  const [chatRoomDeleted, setChatRoomDeleted] = useState(chatDelete);
  const [chatRoomLeave, setChatRoomLeave] = useState(chatLeave);
  const [directMessage, setDirectMessage] = useState(message);

  useUpdateEffect(() => {
    async function updateNotifications() {
      onClose();

      const notificationObject = {
        chatAdd: chatRoomAdded,
        chatDelete: chatRoomDeleted,
        chatLeave: chatRoomLeave,
        follow: profileFollow,
        like: postLikeState,
        message: directMessage,
      };

      await updateUserNotificationField(userDocId, notificationObject);

      onOpen();
    }

    updateNotifications();
  }, [
    postLikeState,
    profileFollow,
    chatRoomAdded,
    chatRoomDeleted,
    chatRoomLeave,
    directMessage,
  ]);

  return (
    <form action="#" method="POST">
      <Toast isOpen={isOpen} onClose={onClose}>
        <p>Settings saved</p>
      </Toast>

      <div className="bg-white divide-y-2">
        <fieldset className="pb-6">
          <div>
            <legend className="font-medium text-gray-900 text-xl mb-5">
              Like
            </legend>
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex items-center">
              <input
                id="postLikeOff"
                name="postLike"
                type="radio"
                value="off"
                className="focus:ring-blue-500 h-4 w-4 text-blue-500 border-gray-300"
                checked={postLikeState === 'off'}
                onChange={({ target }) => setPostLike(target.value)}
              />
              <label
                htmlFor="postLikeOff"
                className="ml-3 block text-sm font-semibold text-black-light"
              >
                Off
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="postLikeEveryone"
                name="postLike"
                type="radio"
                value="on"
                className="focus:ring-blue-500 h-4 w-4 text-blue-500 border-gray-300"
                checked={postLikeState === 'on'}
                onChange={({ target }) => setPostLike(target.value)}
              />
              <label
                htmlFor="postLikeEveryone"
                className="ml-3 block text-sm font-semibold text-black-light"
              >
                From Everyone
              </label>
            </div>
            <p className="text-sm text-gray-base">johndoe liked your post.</p>
          </div>
        </fieldset>

        <fieldset className="pb-6 pt-5">
          <div>
            <legend className="font-medium text-gray-900 text-xl mb-5">
              Follow
            </legend>
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex items-center">
              <input
                id="profileFollowOff"
                name="profileFollow"
                type="radio"
                value="off"
                className="focus:ring-blue-500 h-4 w-4 text-blue-500 border-gray-300"
                checked={profileFollow === 'off'}
                onChange={({ target }) => setProfileFollow(target.value)}
              />
              <label
                htmlFor="profileFollowOff"
                className="ml-3 block text-sm font-semibold text-black-light"
              >
                Off
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="profileFollowEveryone"
                name="profileFollow"
                type="radio"
                value="on"
                className="focus:ring-blue-500 h-4 w-4 text-blue-500 border-gray-300"
                checked={profileFollow === 'on'}
                onChange={({ target }) => setProfileFollow(target.value)}
              />
              <label
                htmlFor="profileFollowEveryone"
                className="ml-3 block text-sm font-semibold text-black-light"
              >
                From Everyone
              </label>
            </div>
            <p className="text-sm text-gray-base">
              johndoe started following you.
            </p>
          </div>
        </fieldset>

        <fieldset className="pb-6 pt-5">
          <div>
            <legend className="font-medium text-gray-900 text-xl mb-5">
              Chat Add
            </legend>
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex items-center">
              <input
                id="chatRoomAddedOff"
                name="chatRoomAdded"
                type="radio"
                value="off"
                className="focus:ring-blue-500 h-4 w-4 text-blue-500 border-gray-300"
                checked={chatRoomAdded === 'off'}
                onChange={({ target }) => setChatRoomAdded(target.value)}
              />
              <label
                htmlFor="chatRoomAddedOff"
                className="ml-3 block text-sm font-semibold text-black-light"
              >
                Off
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="chatRoomAddedEveryone"
                name="chatRoomAdded"
                type="radio"
                value="on"
                className="focus:ring-blue-500 h-4 w-4 text-blue-500 border-gray-300"
                checked={chatRoomAdded === 'on'}
                onChange={({ target }) => setChatRoomAdded(target.value)}
              />
              <label
                htmlFor="chatRoomAddedEveryone"
                className="ml-3 block text-sm font-semibold text-black-light"
              >
                From Everyone
              </label>
            </div>
            <p className="text-sm text-gray-base">
              johndoe added you to a chat room.
            </p>
          </div>
        </fieldset>

        <fieldset className="pt-5 pb-6">
          <div>
            <legend className="font-medium text-gray-900 text-xl mb-5">
              Chat Delete
            </legend>
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex items-center">
              <input
                id="chatRoomDeletedOff"
                name="chatRoomDeleted"
                type="radio"
                value="off"
                className="focus:ring-blue-500 h-4 w-4 text-blue-500 border-gray-300"
                checked={chatRoomDeleted === 'off'}
                onChange={({ target }) => setChatRoomDeleted(target.value)}
              />
              <label
                htmlFor="chatRoomDeletedOff"
                className="ml-3 block text-sm font-semibold text-black-light"
              >
                Off
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="chatRoomDeletedEveryone"
                name="chatRoomDeleted"
                type="radio"
                value="on"
                className="focus:ring-blue-500 h-4 w-4 text-blue-500 border-gray-300"
                checked={chatRoomDeleted === 'on'}
                onChange={({ target }) => setChatRoomDeleted(target.value)}
              />
              <label
                htmlFor="chatRoomDeletedEveryone"
                className="ml-3 block text-sm font-semibold text-black-light"
              >
                From Everyone
              </label>
            </div>
            <p className="text-sm text-gray-base">
              johndoe deleted your chat room.
            </p>
          </div>
        </fieldset>

        <fieldset className="pt-5 pb-6">
          <div>
            <legend className="font-medium text-gray-900 text-xl mb-5">
              Chat Leave
            </legend>
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex items-center">
              <input
                id="chatRoomLeaveOff"
                name="chatRoomLeave"
                type="radio"
                value="off"
                className="focus:ring-blue-500 h-4 w-4 text-blue-500 border-gray-300"
                checked={chatRoomLeave === 'off'}
                onChange={({ target }) => setChatRoomLeave(target.value)}
              />
              <label
                htmlFor="chatRoomLeaveOff"
                className="ml-3 block text-sm font-semibold text-black-light"
              >
                Off
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="chatRoomLeaveEveryone"
                name="chatRoomLeave"
                type="radio"
                value="on"
                className="focus:ring-blue-500 h-4 w-4 text-blue-500 border-gray-300"
                checked={chatRoomLeave === 'on'}
                onChange={({ target }) => setChatRoomLeave(target.value)}
              />
              <label
                htmlFor="chatRoomLeaveEveryone"
                className="ml-3 block text-sm font-semibold text-black-light"
              >
                From Everyone
              </label>
            </div>
            <p className="text-sm text-gray-base">
              johndoe left the chat room.
            </p>
          </div>
        </fieldset>

        <fieldset className="pt-5">
          <div>
            <legend className="font-medium text-gray-900 text-xl mb-5">
              Direct message
            </legend>
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex items-center">
              <input
                id="directMessageOff"
                name="directMessage"
                type="radio"
                value="off"
                className="focus:ring-blue-500 h-4 w-4 text-blue-500 border-gray-300"
                checked={directMessage === 'off'}
                onChange={({ target }) => setDirectMessage(target.value)}
              />
              <label
                htmlFor="directMessageOff"
                className="ml-3 block text-sm font-semibold text-black-light"
              >
                Off
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="directMessageEveryone"
                name="directMessage"
                type="radio"
                value="on"
                className="focus:ring-blue-500 h-4 w-4 text-blue-500 border-gray-300"
                checked={directMessage === 'on'}
                onChange={({ target }) => setDirectMessage(target.value)}
              />
              <label
                htmlFor="directMessageEveryone"
                className="ml-3 block text-sm font-semibold text-black-light"
              >
                From Everyone
              </label>
            </div>
            <p className="text-sm text-gray-base">
              johndoe sent you a new message.
            </p>
          </div>
        </fieldset>
      </div>
    </form>
  );
}

Notifications.propTypes = {
  userDocId: PropTypes.string.isRequired,
  notificationData: PropTypes.shape({
    chatAdd: PropTypes.string,
    chatDelete: PropTypes.string,
    chatLeave: PropTypes.string,
    follow: PropTypes.string,
    like: PropTypes.string,
    message: PropTypes.string,
  }).isRequired,
};
