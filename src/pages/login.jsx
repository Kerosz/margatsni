import { useEffect, useState } from 'react';
import { Formik, Field, Form } from 'formik';
import { Link, useHistory } from 'react-router-dom';
import { useFirebaseContext } from '../context/firebase';
import { UserLoginSchema } from '../helpers/validations';
import * as ROUTES from '../constants/routes';

export default function Login() {
  const history = useHistory();
  const { firebase } = useFirebaseContext();

  const [serverError, setServerError] = useState('');

  const handleFirebaseLogin = async (formValues) => {
    const { email, password } = formValues;

    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);

      history.push(ROUTES.DASHBOARD);
    } catch (error) {
      setServerError(error.message);
    }
  };

  useEffect(() => {
    document.title = `Login - Instagram`;
  }, []);

  return (
    <div className="container flex mx-auto max-w-screen-md items-center justify-center h-screen">
      <div className="md:flex md:w-3/5 hidden">
        <img src="/images/iphone-with-profile.jpg" alt="iPhone" />
      </div>
      <div className="flex flex-col md:w-2/5 w-full max-w-sm">
        <div className="flex flex-col items-center bg-white px-5 py-6 border border-gray-primary mb-3 rounded">
          <h1 className="flex justify-center w-full mb-4">
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
            initialValues={{ email: '', password: '' }}
            validationSchema={UserLoginSchema}
            onSubmit={async (values, { resetForm, setSubmitting }) => {
              try {
                await handleFirebaseLogin(values);
              } finally {
                setSubmitting(false);
                resetForm();
              }
            }}
          >
            {({ isSubmitting, isValid, errors, touched }) => (
              <Form className="w-full">
                <Field
                  type="text"
                  name="email"
                  aria-label="Enter your email address"
                  placeholder="Email address"
                  className="text-sm focus:ring-gray-700 focus:border-gray-400 text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
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
                  className="text-sm focus:ring-gray-700 focus:border-gray-400 text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
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
                  className={`bg-blue-medium text-white w-full rounded h-8 mt-1 font-semibold ${
                    (!isValid || isSubmitting) &&
                    'opacity-50 cursor-not-allowed'
                  }`}
                >
                  {isSubmitting ? 'Logging in...' : 'Log In'}
                </button>
              </Form>
            )}
          </Formik>

          <div className="border-b border-gray-primary w-full flex justify-center mt-3">
            <p className="transform translate-y-2 uppercase bg-white max-w-max px-5 text-xs text-gray-400 font-semibold select-none">
              or
            </p>
          </div>

          <Link
            to={ROUTES.RESET_PASSWORD}
            className="text-sm text-blue-medium mt-6"
          >
            Forgot password?
          </Link>
        </div>
        <div className="flex justify-center items-center flex-col w-full bg-white px-4 py-5 border border-gray-primary rounded">
          <p className="text-sm">
            Don't have an account?{` `}
            <Link to={ROUTES.SIGNUP} className="font-semibold text-blue-medium">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
