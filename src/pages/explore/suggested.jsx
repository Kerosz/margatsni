import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import BottomNavigation from '../../components/bottom-navigation';
import Header from '../../components/header';
import SuggestedProfile from '../../components/sidebar/suggested-profile';
import useFirestoreUser from '../../hooks/use-firestore-user';
import { getSuggestedProfilesByUserId } from '../../services/firebase';

export default function Suggested() {
  const { user } = useFirestoreUser();

  const [suggestedProfileState, setSuggestedProfile] = useState(null);

  useEffect(() => {
    async function getSuggestedProfiles() {
      const response = await getSuggestedProfilesByUserId(
        user.userId,
        user.following,
        35,
      );

      if (response) {
        setSuggestedProfile(response);
      }
    }

    if (user.userId) {
      getSuggestedProfiles();
    }
  }, [user.userId]);

  useEffect(() => {
    document.title = `Suggested People • Instagram`;
  }, []);

  return (
    <div className="bg-gray-background">
      <Header />
      <div className="container mx-auto max-w-screen-sm px-3 py-11">
        <h2 className="font-semibold text-lg text-black-light mb-3 ml-3">
          Suggested
        </h2>

        {suggestedProfileState ? (
          <div className="grid gap-5 bg-white py-3.5 px-5 rounded">
            {suggestedProfileState.map((profile) => (
              <SuggestedProfile
                key={profile.docId}
                suggestedUser={profile}
                currentUser={user}
                secondary
              />
            ))}
          </div>
        ) : (
          <Skeleton count={1} height={480} />
        )}
      </div>
      <BottomNavigation />
    </div>
  );
}
