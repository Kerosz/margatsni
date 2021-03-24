import { useEffect, useState } from 'react';
import BottomNavigation from '../../components/bottom-navigation';
import Gallery from '../../components/gallery';
import Header from '../../components/header';
import { useUserContext } from '../../context/user';
import { getExplorePhotos } from '../../services/firebase';

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
        <ul className="flex flex-col sm:grid sm:grid-cols-2 md:grid-cols-3 md:gap-6 sm:gap-4 mt-4 pb-12">
          <Gallery photos={photosState} loggedInUser={user} withSvg />
        </ul>
      </div>
      <BottomNavigation />
    </div>
  );
}
