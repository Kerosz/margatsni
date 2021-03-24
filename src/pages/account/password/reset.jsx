/* eslint-disable no-unused-vars */
import { Formik, Form, Field } from 'formik';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Header from '../../../components/header';
import { ResetPasswordSchema } from '../../../helpers/validations';
import * as ROUTES from '../../../constants/routes';
import { useUserContext } from '../../../context/user';
import { passwordResetByEmail } from '../../../services/firebase';
import BottomNavigation from '../../../components/bottom-navigation';

export default function ResetPasswordPage() {
  const { user } = useUserContext();
  const isUser = !!user?.uid;

  const [sucessMessage, setSucessMessage] = useState('');
  const [serverError, setSeverError] = useState('');

  async function handlePasswordReset(values) {
    if (values.email) {
      setSucessMessage('');
      setSeverError('');

      try {
        await passwordResetByEmail(values.email, isUser);

        setSucessMessage(
          'An email has been sent. Please allow up to 5 minutes to recieve it!',
        );
      } catch (error) {
        setSeverError(error.message);
      }
    }
  }

  return (
    <div className="bg-gray-background">
      <Header />
      <div className="w-full flex justify-center items-center">
        <div className="border border-gray-primary bg-white sm:mt-8 mt-2 max-w-sm text-black-light rounded flex flex-col">
          <div className="sm:p-11 py-8 px-3 flex flex-col items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-24 text-black-light border-2 border-black-light rounded-full p-3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            <p className="font-semibold mt-3">Trouble Logging In?</p>
            <p className="text-sm text-gray-base text-center mt-2">
              Enter your account email address and we'll send you a link to get
              back into your account.
            </p>
            {serverError && (
              <p className="mt-3 pl-1 text-xs text-center text-red-primary">
                {serverError}
              </p>
            )}
            {sucessMessage && (
              <div
                className="mt-3 flex bg-gray-100 w-full p-2 px-3 rounded justify-center border border-gray-200"
                aria-label="Success message"
              >
                <svg
                  className="w-7 mr-1"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="text-xs ml-2 text-black-light font-semibold tracking-wide">
                  {sucessMessage}
                </p>
              </div>
            )}
            <Formik
              initialValues={{
                email: isUser ? user.email : '',
              }}
              validationSchema={ResetPasswordSchema}
              onSubmit={async (values, { setSubmitting, resetForm }) => {
                await handlePasswordReset(values);

                setSubmitting(false);
                resetForm();
              }}
            >
              {({ isSubmitting, isValid, errors, touched }) => (
                <Form className="w-full">
                  <Field
                    type="text"
                    id="email"
                    name="email"
                    disabled={isUser}
                    placeholder="Email address"
                    className={`rounded focus:ring-gray-700 border border-gray-primary px-2.5 py-1.5 focus:border-gray-400 bg-gray-50 w-full max-w-md focus:outline-none focus-within:outline-none mt-4 ${
                      isUser &&
                      'bg-gray-100 text-gray-400 cursor-not-allowed select-none'
                    }`}
                  />
                  {errors.email && touched.email && (
                    <p className="mb-1 mt-1 pl-1 text-xs text-red-primary">
                      {errors.email}
                    </p>
                  )}

                  <button
                    type="submit"
                    aria-label="Edit profile details"
                    disabled={!isValid || isSubmitting}
                    className={`bg-blue-medium text-white px-4 rounded h-8 mt-4 w-full font-semibold text-sm ${
                      (!isValid || isSubmitting) &&
                      'opacity-50 cursor-not-allowed'
                    }`}
                    onClick={handlePasswordReset}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Login Link'}
                  </button>
                </Form>
              )}
            </Formik>
            {!isUser && (
              <>
                <div className="border-b border-gray-primary w-full flex justify-center mt-5">
                  <p className="transform translate-y-2 uppercase bg-white max-w-max px-5 text-xs text-gray-400 font-semibold select-none">
                    or
                  </p>
                </div>
                <Link
                  to={ROUTES.SIGNUP}
                  className="text-center text-sm text-black-light font-semibold mt-6"
                >
                  Create New Account
                </Link>
              </>
            )}
          </div>

          {!isUser && (
            <Link
              to={ROUTES.LOGIN}
              className="w-full text-center text-sm text-gray-base font-semibold border-t border-gray-primary bg-gray-background py-3 mt-6"
            >
              Back To Login
            </Link>
          )}
        </div>
      </div>
      <BottomNavigation />
    </div>
  );
}
