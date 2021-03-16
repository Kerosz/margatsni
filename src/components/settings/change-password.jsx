import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import { Image } from 'cloudinary-react';
import { Field, Formik, Form } from 'formik';
import { Link } from 'react-router-dom';
import { updateUserPassword } from '../../services/firebase';
import { ChangePasswordSchema } from '../../helpers/validations';
import { RESET_PASSWORD } from '../../constants/routes';

export default function ChangePassword({ username, photo }) {
  const [serverError, setServerError] = useState(null);
  // TODO: Implement a toast or an alert for when sucessfully changed instead of a state
  const [sucessMessage, setSucessMessage] = useState(null);

  useEffect(() => {
    let timeout;
    if (sucessMessage) {
      timeout = setTimeout(() => setSucessMessage(null), 3500);
    }

    return () => clearTimeout(timeout);
  }, [sucessMessage]);

  async function handleChangePasswordFormData(values) {
    // need to reset the server error in case of user alerady recieved an error
    setServerError(null);

    if (values.oldPassword) {
      if (values.oldPassword !== values.password) {
        try {
          await updateUserPassword(values.oldPassword, values.password);

          setSucessMessage('The password has been updated sucessfully!');
        } catch (error) {
          setServerError(error.message);
        }
      } else {
        setServerError('Old password and new password are the same!');
      }
    }
  }

  if (!username || !photo) {
    return (
      <article className="py-8 px-16">
        <Skeleton count={1} height={250} />
      </article>
    );
  }

  return (
    <article className="py-8">
      <Formik
        initialValues={{
          oldPassword: '',
          password: '',
          confirmPassword: '',
        }}
        validationSchema={ChangePasswordSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          await handleChangePasswordFormData(values);

          setSubmitting(false);
          resetForm();
        }}
      >
        {({ isSubmitting, isValid, errors, touched }) => (
          <Form className="flex flex-col">
            <div className="grid gap-8 grid-cols-4">
              <aside className="flex justify-end text-right">
                <Image
                  cloudName={process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}
                  publicId={photo}
                  alt={`${username} profile`}
                  width="64"
                  crop="scale"
                  className="rounded-full h-11 w-11 mt-1.5"
                />
              </aside>
              <div className="col-span-3 flex flex-col pl-1 justify-center">
                <span className="font-medium text-2xl">{username}</span>
              </div>
            </div>

            <div className="grid gap-8 grid-cols-4 mt-11">
              <aside className="flex justify-end text-right">
                <label
                  htmlFor="oldPassword"
                  className="font-semibold text-black-light pt-0.5"
                >
                  Old Password
                </label>
              </aside>
              <div className="col-span-3 flex flex-col pl-1">
                <Field
                  type="password"
                  id="oldPassword"
                  name="oldPassword"
                  className="rounded border border-gray-primary px-2.5 py-2 focus:border-gray-400 bg-gray-100 max-w-md focus:outline-none focus-within:outline-none"
                />
                {errors.oldPassword && touched.oldPassword && (
                  <p className="mb-1 mt-1 pl-1 text-xs text-red-primary">
                    {errors.oldPassword}
                  </p>
                )}
              </div>
            </div>

            <div className="grid gap-8 grid-cols-4 mt-5">
              <aside className="flex justify-end text-right">
                <label
                  htmlFor="password"
                  className="font-semibold text-black-light pt-0.5"
                >
                  New Password
                </label>
              </aside>
              <div className="col-span-3 flex flex-col pl-1">
                <Field
                  type="password"
                  id="password"
                  name="password"
                  className="rounded border border-gray-primary px-2.5 py-2 focus:border-gray-400 bg-gray-100 max-w-md focus:outline-none focus-within:outline-none"
                />
                {errors.password && touched.password && (
                  <p className="mb-1 mt-1 pl-1 text-xs text-red-primary">
                    {errors.password}
                  </p>
                )}
              </div>
            </div>

            <div className="grid gap-8 grid-cols-4 mt-5">
              <aside className="flex justify-end text-right">
                <label
                  htmlFor="confirmPassword"
                  className="font-semibold text-black-light pt-0.5"
                >
                  Confirm New Password
                </label>
              </aside>
              <div className="col-span-3 flex flex-col pl-1">
                <Field
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  className="rounded border border-gray-primary px-2.5 py-2 focus:border-gray-400 bg-gray-100 max-w-md focus:outline-none focus-within:outline-none"
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <p className="mb-1 mt-1 pl-1 text-xs text-red-primary">
                    {errors.confirmPassword}
                  </p>
                )}
                {serverError && (
                  <p className="mt-3 pl-1 text-xs text-red-primary">
                    {serverError}
                  </p>
                )}
                {sucessMessage && (
                  <div className="mt-5 flex" aria-label="Success message">
                    <svg
                      className="w-4"
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
              </div>
            </div>

            <div className="grid gap-8 grid-cols-4 mt-7">
              <aside className="flex justify-end text-right" aria-hidden />
              <div className="col-span-2 flex flex-col pl-1">
                <button
                  type="submit"
                  aria-label="Login to your account"
                  disabled={!isValid || isSubmitting}
                  className={`bg-blue-medium text-white text-sm max-w-max px-4 rounded h-8 mt-1 font-semibold ${
                    (!isValid || isSubmitting) &&
                    'opacity-50 cursor-not-allowed'
                  }`}
                  onClick={handleChangePasswordFormData}
                >
                  {isSubmitting ? 'Processing...' : 'Change Password'}
                </button>

                <Link
                  to={RESET_PASSWORD}
                  className="mt-7 text-sm text-blue-medium font-semibold"
                >
                  Forgot password ?
                </Link>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </article>
  );
}

ChangePassword.defaultProps = {
  photo: undefined,
  username: undefined,
};

ChangePassword.propTypes = {
  photo: PropTypes.string,
  username: PropTypes.string,
};
