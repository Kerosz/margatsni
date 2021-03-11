import PropTypes from 'prop-types';
import { Image } from 'cloudinary-react';
import { useRef } from 'react';
import Header from './header';
import Actions from './actions';
import Footer from './footer';
import Comments from './comments';

export default function Post({ data }) {
  const commentInputRef = useRef(null);

  function handleCommentInputFocus() {
    commentInputRef.current.focus();
  }

  return (
    <div className="rounded col-span-4 bg-white border-gray-primary mb-12">
      <Header user={data.user} />
      <Image
        cloudName={process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}
        publicId={data.imageSrc}
        alt={data.caption}
      />
      <Actions
        docId={data.docId}
        totalLikes={data.likes.length}
        likedPost={data.userLikedPhoto}
        handleCommentFocus={handleCommentInputFocus}
      />
      <Footer username={data.user.username} caption={data.caption} />
      <Comments
        docId={data.docId}
        postComments={data.comments}
        datePosted={data.dateCreated}
        commentInputRef={commentInputRef}
      />
    </div>
  );
}

Post.propTypes = {
  data: PropTypes.exact({
    caption: PropTypes.string.isRequired,
    comments: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)),
    dateCreated: PropTypes.number.isRequired,
    docId: PropTypes.string.isRequired,
    imageSrc: PropTypes.string.isRequired,
    likes: PropTypes.arrayOf(PropTypes.string),
    photoId: PropTypes.number.isRequired,
    userId: PropTypes.string.isRequired,
    userLatitude: PropTypes.string.isRequired,
    userLikedPhoto: PropTypes.bool.isRequired,
    userLongitude: PropTypes.string.isRequired,
    user: PropTypes.shape({
      username: PropTypes.string.isRequired,
      photoURL: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
