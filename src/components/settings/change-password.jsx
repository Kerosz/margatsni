import { useState } from 'react';
import { Field, Formik, Form } from 'formik';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import Toast from '../toast';
import CloudinaryImage from '../cloudinary-image';
import useDisclosure from '../../hooks/use-disclosure';
import { updateUserPassword } from '../../services/firebase';
import { ChangePasswordSchema } from '../../helpers/validations';
import { RESET_PASSWORD } from '../../constants/routes';

export default function ChangePassword({ username, photo }) {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const [serverError, setServerError] = useState(null);

  const isDemoAccount = username === 'demo';

  async function handleChangePasswordFormData(values) {
    // need to reset the server error in case of user alerady recieved an error
    setServerError(null);

    if (values.oldPassword) {
      if (values.oldPassword !== values.password) {
        try {
          if (isDemoAccount) {
            setServerError('Cannot change passowrd for demo account!');
            return;
          }

          await updateUserPassword(values.oldPassword, values.password);

          onOpen();
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
      <article className="py-8 sm:px-16 px-3">
        <Skeleton count={1} height={250} />
      </article>
    );
  }

  return (
    <article className="py-8">
      <Toast isOpen={isOpen} onClose={onClose}>
        <p>Password has been updated sucessfully!</p>
      </Toast>

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
            <div className="grid sm:gap-8 gap-4 sm:grid-cols-4 grid-cols-5">
              <aside className="flex justify-end text-right sm:col-auto col-span-2">
                <CloudinaryImage
                  src={photo}
                  alt={`${username} profile`}
                  size="100"
                  type="profile"
                  className="rounded-full h-11 w-11 mt-1.5"
                />
              </aside>
              <div className="col-span-3 flex flex-col pl-1 justify-center">
                <span className="font-medium text-2xl">{username}</span>
              </div>
            </div>

            <div className="sm:grid flex flex-col sm:gap-8 sm:px-0 px-3 gap-3 sm:grid-cols-4 mt-11">
              <aside className="flex sm:justify-end text-right">
                <label
                  htmlFor="oldPassword"
                  className="font-semibold text-black-light pt-0.5"
                >
                  Old Password
                </label>
              </aside>
              <div className="col-span-3 flex flex-col sm:pl-1">
                <Field
                  type="password"
                  id="oldPassword"
                  name="oldPassword"
                  className="rounded focus:ring-gray-600 border border-gray-primary px-2.5 py-2 focus:border-gray-400 bg-gray-100 max-w-md focus:outline-none focus-within:outline-none"
                />
                {errors.oldPassword && touched.oldPassword && (
                  <p className="mb-1 mt-1 pl-1 text-xs text-red-primary">
                    {errors.oldPassword}
                  </p>
                )}
              </div>
            </div>

            <div className="sm:grid flex flex-col sm:gap-8 sm:px-0 px-3 gap-3 sm:grid-cols-4 mt-5">
              <aside className="flex sm:justify-end text-right">
                <label
                  htmlFor="password"
                  className="font-semibold text-black-light pt-0.5"
                >
                  New Password
                </label>
              </aside>
              <div className="col-span-3 flex flex-col sm:pl-1">
                <Field
                  type="password"
                  id="password"
                  name="password"
                  className="rounded focus:ring-gray-600 border border-gray-primary px-2.5 py-2 focus:border-gray-400 bg-gray-100 max-w-md focus:outline-none focus-within:outline-none"
                />
                {errors.password && touched.password && (
                  <p className="mb-1 mt-1 pl-1 text-xs text-red-primary">
                    {errors.password}
                  </p>
                )}
              </div>
            </div>

            <div className="sm:grid flex flex-col sm:gap-8 sm:px-0 px-3 gap-3 sm:grid-cols-4 mt-5">
              <aside className="flex sm:justify-end text-right">
                <label
                  htmlFor="confirmPassword"
                  className="font-semibold text-black-light pt-0.5"
                >
                  Confirm New Password
                </label>
              </aside>
              <div className="col-span-3 flex flex-col sm:pl-1">
                <Field
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  className="rounded focus:ring-gray-600 border border-gray-primary px-2.5 py-2 focus:border-gray-400 bg-gray-100 max-w-md focus:outline-none focus-within:outline-none"
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
              </div>
            </div>

            <div className="sm:grid flex flex-col sm:gap-8 sm:px-0 px-3 gap-3 sm:grid-cols-4 mt-7">
              <aside className="flex sm:justify-end text-right" aria-hidden />
              <div className="col-span-2 flex flex-col pl-1">
                <button
                  type="submit"
                  aria-label="Login to your account"
                  disabled={!isValid || isSubmitting}
                  className={`bg-blue-medium text-white text-sm max-w-max px-4 rounded py-1.5 mt-1 font-semibold ${
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
