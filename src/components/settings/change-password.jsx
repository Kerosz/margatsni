import PropTypes from 'prop-types';
import { Image } from 'cloudinary-react';

export default function ChangePassword({ username, photo }) {
  function handleChangePasswordFormData(event) {
    event.preventDefault();
  }

  const isValid = true;
  const isSubmitting = false;

  return (
    <article className="py-8">
      <form
        method="POST"
        className="flex flex-col"
        onSubmit={handleChangePasswordFormData}
      >
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
              htmlFor="password"
              className="font-semibold text-black-light pt-0.5"
            >
              New Password
            </label>
          </aside>
          <div className="col-span-3 flex flex-col pl-1">
            <input
              type="password"
              id="password"
              name="password"
              className="rounded border border-gray-primary px-2.5 py-2 focus:border-gray-400 bg-gray-100 max-w-md focus:outline-none focus-within:outline-none"
            />
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
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="rounded border border-gray-primary px-2.5 py-2 focus:border-gray-400 bg-gray-100 max-w-md focus:outline-none focus-within:outline-none"
            />
          </div>
        </div>

        <div className="grid gap-8 grid-cols-4 mt-7">
          <aside className="flex justify-end text-right" aria-hidden />
          <div className="col-span-2 flex flex-col pl-1">
            <button
              type="submit"
              aria-label="Login to your account"
              disabled={!isValid}
              className={`bg-blue-medium text-white max-w-max px-4 rounded h-8 mt-1 font-semibold ${
                !isValid && 'opacity-50 cursor-not-allowed'
              }`}
              onClick={handleChangePasswordFormData}
            >
              {isSubmitting ? 'Changing...' : 'Change Password'}
            </button>
          </div>
        </div>
      </form>
    </article>
  );
}

ChangePassword.propTypes = {
  photo: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};
