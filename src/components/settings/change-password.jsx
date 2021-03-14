import PropTypes from 'prop-types';
import { Image } from 'cloudinary-react';
import { Field, Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { updateUserPassword } from '../../services/firebase';

const PasswordSchema = Yup.object().shape({
  oldPassword: Yup.string()
    .min(6, 'Password must be at least 6 characters long!')
    .max(24, 'Password must be 24 characters at most!')
    .required('Password is a required field!'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters long!')
    .max(24, 'Password must be 24 characters at most!')
    .required('Password is a required field!'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords do not match!')
    .required('Confirm password is a required field!'),
});

export default function ChangePassword({ username, photo }) {
  const [serverError, setServerError] = useState(null);
  // TODO: Implement a toast or an alert for when sucessfully changed instead of a state
  const [sucessMessage, setSucessMessage] = useState(null);

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
      }

      setServerError('Old password and new password are the same!');
    }
  }

  return (
    <article className="py-8">
      <Formik
        initialValues={{
          oldPassword: '',
          password: '',
          confirmPassword: '',
        }}
        validationSchema={PasswordSchema}
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
                  <p className="mt-3 pl-1 text-xs text-black-light">
                    {sucessMessage}
                  </p>
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
                  className={`bg-blue-medium text-white max-w-max px-4 rounded h-8 mt-1 font-semibold ${
                    (!isValid || isSubmitting) &&
                    'opacity-50 cursor-not-allowed'
                  }`}
                  onClick={handleChangePasswordFormData}
                >
                  {isSubmitting ? 'Processing...' : 'Change Password'}
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </article>
  );
}

ChangePassword.propTypes = {
  photo: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};
