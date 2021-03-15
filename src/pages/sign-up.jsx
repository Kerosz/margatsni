import { useEffect, useState } from 'react';
import { Formik, Field, Form } from 'formik';
import { Link, useHistory } from 'react-router-dom';
import { useFirebaseContext } from '../context/firebase';
import { createFirestoreUser, doesUserExist } from '../services/firebase';
import { UserSignUpSchema } from '../helpers/validations';
import * as ROUTES from '../constants/routes';

export default function SignUp() {
  const history = useHistory();
  const { firebase } = useFirebaseContext();

  const [serverError, setServerError] = useState('');

  const handleFirebaseSignUp = async (formValues) => {
    const { email, password, username, fullName } = formValues;
    const usernameAlreadyExists = await doesUserExist(username);

    if (!usernameAlreadyExists) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          const { user } = userCredential;

          user.updateProfile({
            displayName: username.toLowerCase(),
            photoURL:
              'https://res.cloudinary.com/kerosz/image/upload/v1615369912/instagram/avatars/default-avatar_wfrmaq.jpg',
          });

          createFirestoreUser({
            userId: user.uid,
            username: username.toLowerCase(),
            userInfo: {
              fullName,
              website: '',
              bio: '',
              phoneNumber: '',
            },
            followers: [],
            following: [],
            emailAddress: email,
            photoURL:
              'https://res.cloudinary.com/kerosz/image/upload/v1615369912/instagram/avatars/default-avatar_wfrmaq.jpg',
            dateCreated: Date.now(),
            verifiedUser: false,
            privateProfile: false,
            savedPosts: [],
            allowSuggestions: true,
          }).then(() => {
            history.push(ROUTES.DASHBOARD);

            // TODO: Find a way to make the header component update with the right data without having to force reload the page after routing
            window.location.reload();
          });
        })
        .catch((error) => setServerError(error.message));
    } else {
      setServerError('Username already exists, please try another!');
    }
  };

  useEffect(() => {
    document.title = `Sign Up - Instagram`;
  }, []);

  return (
    <div className="container flex mx-auto max-w-screen-md items-center h-screen">
      <div className="flex w-3/5">
        <img src="/images/iphone-with-profile.jpg" alt="iPhone" />
      </div>
      <div className="flex flex-col w-2/5">
        <div className="flex flex-col items-center bg-white p-4 border border-gray-primary mb-4 rounded">
          <h1 className="flex justify-center w-full">
            <img
              className="mt-2 w-6/12 mb-4"
              src="/images/logo.png"
              alt="Instagram branding"
            />
          </h1>
          {serverError && (
            <p className="mb-5 pl-1 text-xs text-center text-red-primary">
              {serverError}
            </p>
          )}

          <Formik
            initialValues={{
              username: '',
              fullName: '',
              email: '',
              password: '',
            }}
            validationSchema={UserSignUpSchema}
            onSubmit={async (values, { resetForm, setSubmitting }) => {
              await handleFirebaseSignUp(values);
              setSubmitting(false);
              resetForm();
            }}
          >
            {({ isSubmitting, isValid, errors, touched }) => (
              <Form className="w-full">
                <Field
                  type="text"
                  name="username"
                  aria-label="Enter your username"
                  placeholder="Username"
                  className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                />
                {errors.username && touched.username && (
                  <p className="mb-3 pl-1 text-xs text-red-primary">
                    {errors.username}
                  </p>
                )}
                <Field
                  type="text"
                  name="fullName"
                  aria-label="Enter your full name"
                  placeholder="Full Name"
                  className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                />
                {errors.fullName && touched.fullName && (
                  <p className="mb-3 pl-1 text-xs text-red-primary">
                    {errors.fullName}
                  </p>
                )}
                <Field
                  type="text"
                  name="email"
                  aria-label="Enter your email address"
                  placeholder="Email address"
                  className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                />
                {errors.email && touched.email && (
                  <p className="mb-3 pl-1 text-xs text-red-primary">
                    {errors.email}
                  </p>
                )}
                <Field
                  type="password"
                  name="password"
                  aria-label="Enter your password"
                  placeholder="Password"
                  className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                />
                {errors.password && touched.password && (
                  <p className="mb-3 pl-1 text-xs text-red-primary">
                    {errors.password}
                  </p>
                )}
                <button
                  type="submit"
                  aria-label="Login to your account"
                  disabled={!isValid}
                  className={`bg-blue-medium text-white w-full rounded h-8 mt-1 font-bold ${
                    (!isValid || isSubmitting) &&
                    'opacity-50 cursor-not-allowed'
                  }`}
                >
                  {isSubmitting ? 'Signing up...' : 'Sign Up'}
                </button>
              </Form>
            )}
          </Formik>
        </div>
        <div className="flex justify-center items-center flex-col w-full bg-white p-4 border border-gray-primary rounded">
          <p className="text-sm">
            Have an account already?{` `}
            <Link to={ROUTES.LOGIN} className="font-bold text-blue-medium">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
