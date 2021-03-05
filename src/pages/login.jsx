import { useEffect } from 'react';
// import { useHistory } from 'react-router-dom';
// import { useFirebaseContext } from '../context/firebase';

export default function Login() {
  // const history = useHistory();
  // const { firebase } = useFirebaseContext();

  useEffect(() => {
    document.title = `Login - Instagram`;
  }, []);

  return (
    <div className="container flex mx-auto max-w-screen-md items-center h-screen">
      <div className="flex w-3/5">
        <img src="/images/iphone-with-profile.jpg" alt="iPhone" />
      </div>
      <div className="flex flex-col w-2/5">
        <p>I will be the form</p>
      </div>
    </div>
  );
}
