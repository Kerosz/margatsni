import PropTypes from 'prop-types';
import { Image, Transformation } from 'cloudinary-react';

/**
 * Component used to fetch and display an image from cloudinary with transformations.
 *
 * @component
 *
 * @param {string} type Type of the of the image you are using `'profile' | 'post'`. It controls the gravity.
 * @param {string} size Size of the image. It controls both the `width` and the `height`
 * @param {string} width Width of the image.
 * @param {string} height Height of the image.
 * @param {string} [crop='fill'] Resize/crop the image `'scale' | 'fit' | 'pad' | 'crop' | 'fill'`
 * @param {string} [quality='auto:good'] The quality of the image to be applied on the transformation
 * @param {string} src The public ID of the cloudinary image
 * @param {string} alt Image alternative text
 *
 * @example
 * import CloudinaryImage from './cloudinary-image';
 *
 * <CloudinaryImage
 *  src={photo.publicId}
 *  alt="Dog on the beach"
 *  size="65"
 *  type="profile"
 * />
 */
export default function CloudinaryImage({
  type,
  size,
  width,
  height,
  crop,
  quality,
  src,
  alt,
  ...rest
}) {
  const imageGravity = type === 'profile' ? 'face' : 'auto';

  return (
    <Image
      cloudName={process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}
      publicId={src}
      alt={alt}
      width={size || width}
      height={size || height}
      crop={crop}
      {...rest}
    >
      <Transformation
        gravity={imageGravity}
        fetchFormat="auto"
        quality={quality}
      />
    </Image>
  );
}

CloudinaryImage.defaultProps = {
  crop: `fill`,
  quality: `auto:good`,
  size: null,
  width: null,
  height: null,
};

CloudinaryImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['profile', 'post']).isRequired,
  size: PropTypes.string,
  crop: PropTypes.string,
  quality: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
};
