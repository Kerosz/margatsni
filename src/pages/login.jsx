import { useEffect, useState } from 'react';
import { Formik, Field, Form } from 'formik';
import { Link, useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import * as ROUTES from '../constants/routes';
import { useFirebaseContext } from '../context/firebase';

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Email address has a wrong format')
    .required('Email address is a required field'),
  password: Yup.string()
    .min(6, 'Password must be atleast 6 characters long!')
    .max(24, 'Password must be 24 characters at most!')
    .required('Password is a required field'),
});

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
            initialValues={{ email: '', password: '' }}
            validationSchema={LoginSchema}
            onSubmit={async (values, { resetForm, setSubmitting }) => {
              await handleFirebaseLogin(values);
              setSubmitting(false);
              resetForm();
            }}
          >
            {({ isSubmitting, isValid, errors, touched }) => (
              <Form className="w-full">
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
                  {isSubmitting ? 'Logging in...' : 'Log In'}
                </button>
              </Form>
            )}
          </Formik>
        </div>
        <div className="flex justify-center items-center flex-col w-full bg-white p-4 border border-gray-primary rounded">
          <p className="text-sm">
            Don't have an account?{` `}
            <Link to={ROUTES.SIGNUP} className="font-bold text-blue-medium">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
