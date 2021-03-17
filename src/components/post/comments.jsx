import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Image } from 'cloudinary-react';

export default function Comments({ postUser, caption, postComments }) {
  return (
    <ul className="p-5 space-y-3 overflow-y-auto flex-auto border-b border-gray-primary">
      <li className="flex items-center space-x-2 sm:pr-4 pr-2">
        <Link
          to={`/u/${postUser.username}`}
          className="flex items-center min-w-max self-start"
        >
          <Image
            cloudName={process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}
            publicId={postUser.photoURL}
            alt={`${postUser.username} profile`}
            width="32"
            crop="scale"
            className="rounded-full h-8 w-8 flex mr-4"
          />
          <p className="font-semibold text-black-light hover:underline">
            {postUser.username}
          </p>
        </Link>
        <p className="text-sm mt-0.5">{caption}</p>
      </li>

      {postComments.map((entry) => (
        <li
          key={entry.commentId}
          className="flex items-center space-x-2 sm:pr-4 pr-2"
        >
          <Link
            to={`/u/${entry.username}`}
            className="flex items-center min-w-max self-start"
          >
            <Image
              cloudName={process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}
              publicId={entry.photoURL}
              alt={`${entry.username} profile`}
              width="32"
              crop="scale"
              className="rounded-full h-8 w-8 flex mr-4"
            />
            <p className="font-semibold text-black-light hover:underline">
              {entry.username}
            </p>
          </Link>
          <p className="text-sm mt-0.5 break-words whitespace-pre-line">
            {entry.comment}
          </p>
        </li>
      ))}
    </ul>
  );
}

Comments.propTypes = {
  postUser: PropTypes.shape({
    userId: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    photoURL: PropTypes.string.isRequired,
    verifiedUser: PropTypes.bool.isRequired,
    docId: PropTypes.string.isRequired,
  }).isRequired,
  caption: PropTypes.string.isRequired,
  postComments: PropTypes.arrayOf(
    PropTypes.shape({
      commentId: PropTypes.string.isRequired,
      userId: PropTypes.string.isRequired,
      comment: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      dateCreated: PropTypes.number.isRequired,
      photoURL: PropTypes.string.isRequired,
    }),
  ).isRequired,
};
