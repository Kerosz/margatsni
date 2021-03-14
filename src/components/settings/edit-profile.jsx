import { useState } from 'react';
import PropTypes from 'prop-types';
import { Image } from 'cloudinary-react';
import { Form, Formik, Field } from 'formik';
import * as Yup from 'yup';
import { uploadUnsignedImage } from '../../services/cloudinary';
import { updateUserDataByUserId } from '../../services/firebase';
import { useFirebaseContext } from '../../context/firebase';

const ProfileSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Username must be at least 3 characters long!')
    .max(12, 'Username must be 12 characters at most!')
    .lowercase('Username must be lowercase only!')
    .required('Username is a required field!')
    .strict(),
  fullName: Yup.string()
    .min(3, 'Full name must be at least 3 characters long!')
    .max(34, 'Full name must be 34 characters at most!')
    .required('Full name is a required field!'),
  email: Yup.string()
    .email('Email address has a wrong format!')
    .required('Email address is a required field!'),
  website: Yup.string().url('Website link has a wrong format!'),
  phone: Yup.string().matches(
    /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
    'Phone number has a wrong format!',
  ),
  bio: Yup.string()
    .min(2, 'Bio must be at least 2 characters long!')
    .max(128, 'Bio must be 256 characters at most!'),
});

export default function EditProfile({ data }) {
  const { firebase } = useFirebaseContext();

  const [uploadedImage, setUploadedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  async function handleEditProfileFormData(values) {
    if (values.username) {
      const user = firebase.auth().currentUser;

      let cloudinaryResponse;
      if (uploadedImage) {
        cloudinaryResponse = await uploadUnsignedImage(
          uploadedImage,
          data.username,
          'avatar',
        );
      }

      const profileDataObject = {
        username: values.username,
        userInfo: {
          fullName: values.fullName,
          website: values.website,
          bio: values.bio,
          phoneNumber: values.phone,
        },
        emailAddress: values.email,
      };

      if (values.username !== user.displayName) {
        user.updateProfile({
          displayName: values.username,
        });
      }

      if (values.email !== user.email) {
        user.updateProfile({
          email: values.username,
        });
      }

      if (cloudinaryResponse) {
        profileDataObject.photoURL = cloudinaryResponse.public_id;

        user.updateProfile({
          photoURL: cloudinaryResponse.public_id,
        });
      }

      updateUserDataByUserId(data.docId, profileDataObject);

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
        validationSchema={ProfileSchema}
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
                  placeholder="Email address"
                  className="rounded border border-gray-primary px-2.5 py-1 focus:border-gray-400"
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
              </div>
            </div>

            <div className="grid gap-8 grid-cols-4 mt-6">
              <aside className="flex justify-end" aria-hidden />
              <div className="col-span-2 flex flex-col pl-1">
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
  }).isRequired,
};
