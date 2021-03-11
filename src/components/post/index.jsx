import PropTypes from 'prop-types';
import { Image } from 'cloudinary-react';
import Header from './header';
import Actions from './actions';
import Footer from './footer';

export default function Post({ data }) {
  function handleCommentInputFocus() {
    return 0;
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
    </div>
  );
}

Post.propTypes = {
  data: PropTypes.exact({
    caption: PropTypes.string.isRequired,
    comments: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
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
