/* eslint-disable no-unused-vars */
import Skeleton from 'react-loading-skeleton';
import useUserPhotos from '../hooks/use-user-photos';
import Post from './post';

export default function Timeline() {
  const { photos } = useUserPhotos();

  if (!photos) {
    return (
      <div className="container col-span-2">
        <Skeleton className="mb-4" count={4} height={450} />
      </div>
    );
  }

  if (photos.length < 1) {
    return (
      <div className="container col-span-2">
        <p className="text-center text-2xl">Follow people to see photos!</p>
      </div>
    );
  }

  return (
    <div className="container col-span-2">
      {photos.map((photo) => (
        <Post key={photo.photoId} data={photo} />
      ))}
    </div>
  );
}

// Timeline.whyDidYouRender = true;
