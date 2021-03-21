import { useEffect, useState } from 'react';
import Gallery from '../components/gallery';
import Header from '../components/header';
import { useUserContext } from '../context/user';
import { getExplorePhotos } from '../services/firebase';

export default function Explore() {
  const { user } = useUserContext();

  const [photosState, setPhotos] = useState(null);

  useEffect(() => {
    async function getPhotos() {
      const photos = await getExplorePhotos(user.uid, 21);

      if (photos) {
        setPhotos(photos);
      }
    }

    getPhotos();
  }, []);

  useEffect(() => {
    document.title = `Explore • Instagram`;
  }, []);

  return (
    <div className="bg-gray-background">
      <Header />
      <div className="container mx-auto max-w-screen-lg px-3">
        <Gallery photos={photosState} />
      </div>
    </div>
  );
}
