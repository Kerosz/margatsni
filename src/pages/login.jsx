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
    <div className="container flex mx-auto max-w-screen-md items-center">
      login
    </div>
  );
}
