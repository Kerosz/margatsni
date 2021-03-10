import { useEffect, useState } from 'react';
import { Formik, Field, Form } from 'formik';
import { Link, useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import * as ROUTES from '../constants/routes';
import { useFirebaseContext } from '../context/firebase';
import { doesUserExist } from '../services/firebase';

const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Username must be at least 3 characters long!')
    .max(12, 'Username must be 12 characters at most!')
    .required('Username is a required field'),
  fullName: Yup.string()
    .min(3, 'Full name must be at least 3 characters long!')
    .max(34, 'Full name must be 34 characters at most!')
    .required('Full name is a required field'),
  email: Yup.string()
    .email('Email address has a wrong format')
    .required('Email address is a required field'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters long!')
    .max(24, 'Password must be 24 characters at most!')
    .required('Password is a required field'),
});

export default function SignUp() {
  const history = useHistory();
  const { firebase } = useFirebaseContext();

  const [serverError, setServerError] = useState('');

  const handleFirebaseSignUp = async (formValues) => {
    const { email, password, username, fullName } = formValues;
    const usernameAlreadyExists = await doesUserExist(username);

    if (!usernameAlreadyExists) {
      try {
        const createdUserResult = await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password);

        await createdUserResult.user.updateProfile({
          displayName: username,
        });

        await firebase.firestore().collection('users').add({
          userId: createdUserResult.user.uid,
          username: username.toLowerCase(),
          fullName,
          followers: [],
          following: [],
          emailAddress: email,
          dateCreated: Date.now(),
        });

        history.push(ROUTES.DASHBOARD);
      } catch (error) {
        setServerError(error.message);
      }
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
            validationSchema={SignupSchema}
            onSubmit={async (
              values,
              { resetForm, setSubmitting },
            ) => {
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
                    !isValid && 'opacity-50 cursor-not-allowed'
                  }`}
                >
                  {isSubmitting ? 'Loading...' : 'Sign Up'}
                </button>
              </Form>
            )}
          </Formik>
        </div>
        <div className="flex justify-center items-center flex-col w-full bg-white p-4 border border-gray-primary rounded">
          <p className="text-sm">
            Have an account already?{` `}
            <Link
              to={ROUTES.LOGIN}
              className="font-bold text-blue-medium"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
