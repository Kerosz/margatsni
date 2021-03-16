import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import { Image } from 'cloudinary-react';
import { Form, Formik, Field } from 'formik';
import { uploadUnsignedImage } from '../../services/cloudinary';
import {
  updateUserDataByUserId,
  updateUserEmailAddress,
} from '../../services/firebase';
import { useFirebaseContext } from '../../context/firebase';
import { EditProfileSchema } from '../../helpers/validations';

export default function EditProfile({ data }) {
  const { firebase } = useFirebaseContext();

  const [uploadedImage, setUploadedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [serverError, setServerError] = useState(null);
  const [sucessMessage, setSucessMessage] = useState(null);

  useEffect(() => {
    let timeout;
    if (sucessMessage) {
      timeout = setTimeout(() => setSucessMessage(null), 3000);
    }

    return () => clearTimeout(timeout);
  }, [sucessMessage]);

  async function handleEditProfileFormData(values) {
    /**
     * Check to see if any of the values are truthy.
     * Formik sends an object with it's methods as values first render, and the actual values the second render, so it calls `handleEditProfileFormData` twice otherwise
     */
    if (values.username) {
      const user = firebase.auth().currentUser;

      let cloudinaryResponse;
      if (uploadedImage) {
        cloudinaryResponse = await uploadUnsignedImage(
          uploadedImage,
          values.username,
          'avatar',
        );
      }

      const profileDataObject = {
        userInfo: {
          fullName: values.fullName,
          website: values.website,
          bio: values.bio,
          phoneNumber: values.phone,
        },
      };

      if (cloudinaryResponse) {
        profileDataObject.photoURL = cloudinaryResponse.public_id;

        user.updateProfile({
          photoURL: cloudinaryResponse.public_id,
        });
      }

      if (values.username !== user.displayName) {
        profileDataObject.username = values.username;

        user.updateProfile({
          displayName: values.username,
        });
      }

      // TODO: Have a popup to show an `enteer password again` to re-autentificate the user before changing the email
      if (values.email !== user.email) {
        try {
          await updateUserEmailAddress(values.email);

          profileDataObject.emailAddress = values.email;
        } catch (error) {
          setServerError(error.message);
        }
      }

      await updateUserDataByUserId(data.docId, profileDataObject);

      setSucessMessage('Profile updated sucesfully');
      setPreviewImage(null);
      setUploadedImage(null);
    }
  }

  function handleImageUpload(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    setUploadedImage(file);

    reader.readAsDataURL(file);
    reader.onload = () => {
      // https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readyState
      if (reader.readyState === 2) {
        setPreviewImage(reader.result);
      }
    };
  }

  if (!data.userId) {
    return (
      <article className="py-8 px-16">
        <Skeleton count={1} height={400} />
      </article>
    );
  }

  return (
    <article className="py-8">
      <Formik
        initialValues={{
          username: data.username,
          fullName: data.userInfo.fullName,
          website: data.userInfo.website,
          email: data.emailAddress,
          bio: data.userInfo.bio,
          phone: data.userInfo.phoneNumber,
        }}
        validationSchema={EditProfileSchema}
        onSubmit={async (values, { setSubmitting }) => {
          await handleEditProfileFormData(values);

          setSubmitting(false);
        }}
      >
        {({ isSubmitting, isValid, errors, touched }) => (
          <Form className="flex flex-col">
            <div className="grid gap-8 grid-cols-4">
              <aside className="flex justify-end text-right">
                <label htmlFor="fileUpload" className="relative cursor-pointer">
                  {previewImage ? (
                    <img
                      src={previewImage}
                      alt="Uploaded preview"
                      className="rounded-full h-11 w-11 mt-1.5"
                    />
                  ) : (
                    <Image
                      cloudName={process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}
                      publicId={data.photoURL}
                      alt={`${data.username} profile`}
                      width="64"
                      crop="scale"
                      className="rounded-full h-11 w-11 mt-1.5"
                    />
                  )}
                </label>
              </aside>

              <div className="col-span-3 flex flex-col pl-1">
                <span className="font-medium text-xl">{data.username}</span>

                <label
                  htmlFor="fileUpload"
                  className="relative cursor-pointer bg-white text-blue-500 text-sm font-semibold"
                >
                  Change Profile Photo
                  <input
                    id="fileUpload"
                    name="fileUpload"
                    accept="image/jpeg,image/png"
                    type="file"
                    className="sr-only"
                    onChange={handleImageUpload}
                  />
                </label>
                {previewImage && (
                  <span className="text-sm text-gray-base">
                    Preview mode, submit to save
                  </span>
                )}
              </div>
            </div>
            <div className="grid gap-8 grid-cols-4 mt-4">
              <aside className="flex justify-end ">
                <label
                  htmlFor="fullName"
                  className="font-semibold text-black-light pt-0.5"
                >
                  Name
                </label>
              </aside>
              <div className="col-span-2 flex flex-col pl-1">
                <Field
                  type="text"
                  id="fullName"
                  name="fullName"
                  placeholder="Name"
                  className="rounded border border-gray-primary px-2.5 py-1 focus:border-gray-400"
                />
                {errors.fullName && touched.fullName && (
                  <p className="mb-0.5 mt-1pl-1 text-xs text-red-primary">
                    {errors.fullName}
                  </p>
                )}
                <p className="text-gray-base text-xs mt-3">
                  Help people discover your account by using the name you're
                  known by: either your full name, nickname, or business name.
                </p>
              </div>
            </div>

            <div className="grid gap-8 grid-cols-4 mt-6">
              <aside className="flex justify-end text-right">
                <label
                  htmlFor="username"
                  className="font-semibold text-black-light pt-0.5"
                >
                  Username
                </label>
              </aside>
              <div className="col-span-2 flex flex-col pl-1">
                <Field
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Username"
                  className="rounded border border-gray-primary px-2.5 py-1 focus:border-gray-400"
                />
                {errors.username && touched.username && (
                  <p className="mb-0.5 mt-1 pl-1 text-xs text-red-primary">
                    {errors.username}
                  </p>
                )}
                <p className="text-gray-base text-xs mt-3">
                  In most cases, you won't be able to change your username back
                  to {data.username} in case some other users take it.
                </p>
              </div>
            </div>

            <div className="grid gap-8 grid-cols-4 mt-6">
              <aside className="flex justify-end text-right">
                <label
                  htmlFor="website"
                  className="font-semibold text-black-light pt-0.5"
                >
                  Website
                </label>
              </aside>
              <div className="col-span-2 flex flex-col pl-1">
                <Field
                  type="url"
                  id="website"
                  name="website"
                  placeholder="Website"
                  className="rounded border border-gray-primary px-2.5 py-1 focus:border-gray-400"
                />
                {errors.website && touched.website && (
                  <p className="mb-0.5 mt-1 pl-1 text-xs text-red-primary">
                    {errors.website}
                  </p>
                )}
              </div>
            </div>

            <div className="grid gap-8 grid-cols-4 mt-6">
              <aside className="flex justify-end text-right">
                <label
                  htmlFor="bio"
                  className="font-semibold text-black-light pt-0.5"
                >
                  Bio
                </label>
              </aside>
              <div className="col-span-2 flex flex-col pl-1">
                <Field
                  as="textarea"
                  id="bio"
                  name="bio"
                  rows={2}
                  className="rounded border border-gray-primary px-2.5 py-1 focus:border-gray-400"
                />
                {errors.bio && touched.bio && (
                  <p className="mb-0.5 mt-1 pl-1 text-xs text-red-primary">
                    {errors.bio}
                  </p>
                )}
              </div>
            </div>

            <div className="grid gap-8 grid-cols-4 mt-9">
              <aside className="flex justify-end text-right" aria-hidden />
              <div className="col-span-2 flex flex-col pl-1">
                <p className="text-sm text-gray-base font-semibold">
                  Personal Information
                </p>
                <p className="text-gray-base text-xs mt-1">
                  Provide your personal information, even if the account is used
                  for a business, a pet or something else. This won't be a part
                  of your public profile.
                </p>
              </div>
            </div>

            <div className="grid gap-8 grid-cols-4 mt-6">
              <aside className="flex justify-end text-right">
                <label
                  htmlFor="email"
                  className="font-semibold text-black-light pt-0.5"
                >
                  Email
                </label>
              </aside>
              <div className="col-span-2 flex flex-col pl-1">
                <Field
                  type="email"
                  id="email"
                  name="email"
                  disabled
                  placeholder="Email address"
                  className="rounded border border-gray-primary px-2.5 py-1 focus:border-gray-400 text-gray-500 cursor-not-allowed"
                />
                {errors.email && touched.email && (
                  <p className="mb-0.5 mt-1 pl-1 text-xs text-red-primary">
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            <div className="grid gap-8 grid-cols-4 mt-6">
              <aside className="flex justify-end text-right">
                <label
                  htmlFor="phone"
                  className="font-semibold text-black-light pt-0.5"
                >
                  Phone Number
                </label>
              </aside>
              <div className="col-span-2 flex flex-col pl-1">
                <Field
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="Phone Number"
                  className="rounded border border-gray-primary px-2.5 py-1 focus:border-gray-400"
                />
                {errors.phone && touched.phone && (
                  <p className="mb-0.5 mt-1 pl-1 text-xs text-red-primary">
                    {errors.phone}
                  </p>
                )}
                {serverError && (
                  <p className="mt-3 pl-1 text-xs text-red-primary">
                    {serverError}
                  </p>
                )}
              </div>
            </div>

            <div className="grid gap-8 grid-cols-4 mt-6">
              <aside className="flex justify-end" aria-hidden />
              <div className="col-span-2 flex flex-col pl-1">
                {sucessMessage && (
                  <div
                    className="mb-3 flex bg-gray-100 w-full p-2 px-4 rounded justify-center text-center border border-gray-200"
                    aria-label="Success message"
                  >
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
                <button
                  type="submit"
                  aria-label="Edit profile details"
                  disabled={!isValid || isSubmitting}
                  className={`bg-blue-medium text-white max-w-max px-4 rounded h-8 mt-1 font-semibold ${
                    (!isValid || isSubmitting) &&
                    'opacity-50 cursor-not-allowed'
                  }`}
                  onClick={handleEditProfileFormData}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </article>
  );
}

EditProfile.defaultProps = {
  data: undefined,
};

EditProfile.propTypes = {
  data: PropTypes.shape({
    dateCreated: PropTypes.number,
    docId: PropTypes.string,
    emailAddress: PropTypes.string,
    followers: PropTypes.arrayOf(PropTypes.string),
    following: PropTypes.arrayOf(PropTypes.string),
    userInfo: PropTypes.shape({
      bio: PropTypes.string.isRequired,
      fullName: PropTypes.string.isRequired,
      phoneNumber: PropTypes.string.isRequired,
      website: PropTypes.string.isRequired,
    }),
    photoURL: PropTypes.string,
    userId: PropTypes.string,
    username: PropTypes.string,
  }),
};
