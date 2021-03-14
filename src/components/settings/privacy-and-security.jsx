/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import { Form, Formik, Field } from 'formik';
import * as Yup from 'yup';

const PrivacySchema = Yup.object();

export default function PrivacyAndSecurity({
  privateStatus,
  suggestedProfile,
}) {
  // TODO: Make the firebase calls for changing the data
  async function handlePrivacyFormData(event) {
    event.preventDefault();
  }

  // TODO: Implement account deletion
  // Button temporarly disabled until the functionality is added
  const tempDisabled = true;

  return (
    <article className="py-8 px-14">
      <Formik
        initialValues={{
          private: privateStatus,
          suggestion: suggestedProfile,
        }}
        validationSchema={PrivacySchema}
        onSubmit={async (values, { setSubmitting }) => {
          await handlePrivacyFormData(values);

          setSubmitting(false);
        }}
      >
        <Form className="flex flex-col">
          <fieldset className="border-b border-gray-primary pb-6">
            <legend className="font-medium text-black-light text-2xl">
              Account Privacy
            </legend>
            <div className="mt-6">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <Field
                    id="private"
                    name="private"
                    type="checkbox"
                    className="focus:ring-indigo-500 h-4 w-4 border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="private"
                    className="font-semibold text-gray-700"
                  >
                    Private Account
                  </label>
                </div>
              </div>
              <p className="text-gray-base mt-2.5">
                When your account is private, only people you approve can see
                your photos and videos on Instagram. Your existing followers
                won't be affected.
              </p>
            </div>

            <div className="mt-8">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <Field
                    id="suggestion"
                    name="suggestion"
                    type="checkbox"
                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="suggestion"
                    className="font-semibold text-gray-700"
                  >
                    Allow Suggestions
                  </label>
                </div>
              </div>
              <p className="text-gray-base mt-2.5">
                Include your account in suggestions when recommending similar
                accounts people might want to follow.
              </p>
            </div>
          </fieldset>

          <fieldset className="pb-3 mt-10">
            <legend className="font-medium text-black-light text-2xl">
              Account Security
            </legend>
            <div className="mt-6">
              <span className="text-gray-base font-semibold mt-2.5">
                Warning
              </span>
              <p className="text-gray-base mt-1">
                This action cannot be undone, Once you delete your account,
                there is no going back. Please be certain. This will permanently
                delete the account and all the data stored on for your account!
              </p>
              <button
                type="button"
                aria-label="Delete account"
                onClick={handlePrivacyFormData}
                className={`font-bold text-sm text-white rounded h-8 bg-red-primary px-3 mt-4 ${
                  tempDisabled && 'opacity-50 cursor-not-allowed'
                }`}
                disabled={tempDisabled}
              >
                Delete account
              </button>
            </div>
          </fieldset>
        </Form>
      </Formik>
    </article>
  );
}

PrivacyAndSecurity.propTypes = {
  privateStatus: PropTypes.bool.isRequired,
  suggestedProfile: PropTypes.bool.isRequired,
};
