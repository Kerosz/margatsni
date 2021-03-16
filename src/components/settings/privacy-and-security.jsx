/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import { useEffect, useState } from 'react';
import { updateUserFieldValueByDocId } from '../../services/firebase';
import useUpdateEffect from '../../hooks/use-update-effect';

export default function PrivacyAndSecurity({
  privateStatus,
  suggestedStatus,
  userDocId,
}) {
  // Extra states needed for the firebase status in order to check against the updated state to be able to live update the page without reload
  const [firebasePrivate, setFirebasePrivate] = useState(privateStatus);
  const [firebaseSuggested, setFirebaseSuggested] = useState(suggestedStatus);

  const [privateCheckbox, setPrivateCheckbox] = useState(privateStatus);
  const [suggestionCheckbox, setSuggestionCheckbox] = useState(suggestedStatus);
  const [sucessMessage, setSucessMessage] = useState(null);

  useUpdateEffect(() => {
    async function changePrivateProfileValue() {
      await updateUserFieldValueByDocId(userDocId, {
        privateProfile: privateCheckbox,
      });

      setSucessMessage(
        `Profile page was set to ${privateCheckbox ? 'private' : 'public'}!`,
      );

      setFirebasePrivate((prevState) => !prevState);
    }

    if (privateCheckbox !== firebasePrivate) {
      changePrivateProfileValue();
    }
  }, [privateCheckbox]);

  useUpdateEffect(() => {
    async function changeAllowSuggestionsValue() {
      await updateUserFieldValueByDocId(userDocId, {
        allowSuggestions: suggestionCheckbox,
      });

      setSucessMessage(
        `Profile suggestions are now ${
          suggestionCheckbox ? 'enabled' : 'disabled'
        }`,
      );

      setFirebaseSuggested((prevState) => !prevState);
    }

    if (suggestionCheckbox !== firebaseSuggested) {
      changeAllowSuggestionsValue();
    }
  }, [suggestionCheckbox]);

  useUpdateEffect(() => {
    setPrivateCheckbox(privateStatus);
    setFirebasePrivate(privateStatus);
  }, [privateStatus]);

  useUpdateEffect(() => {
    setSuggestionCheckbox(suggestedStatus);
    setFirebaseSuggested(suggestedStatus);
  }, [suggestedStatus]);

  useEffect(() => {
    let timeout;
    if (sucessMessage) {
      timeout = setTimeout(() => setSucessMessage(null), 3500);
    }

    return () => clearTimeout(timeout);
  }, [sucessMessage]);

  // TODO: Implement account deletion
  // Button temporarly disabled until the functionality is added
  const tempDisabled = true;

  if (!userDocId) {
    return (
      <article className="py-8 px-16">
        <Skeleton count={1} height={350} />
      </article>
    );
  }

  return (
    <article className="py-8 px-14">
      <form className="flex flex-col">
        <fieldset className="border-b border-gray-primary pb-6">
          <legend className="font-medium text-black-light text-2xl">
            Account Privacy
          </legend>
          {sucessMessage && (
            <div className="mt-2 mb-1 flex bg-gray-100 w-full p-2 px-4 rounded justify-center text-center border border-gray-200">
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
          <div className="mt-6">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="private"
                  name="private"
                  type="checkbox"
                  value={privateCheckbox}
                  defaultChecked={privateCheckbox}
                  onClick={({ target }) => setPrivateCheckbox(target.checked)}
                />
              </div>
              <div className="ml-3 text-sm">
                <label
                  htmlFor="private"
                  className="font-semibold text-black-light"
                >
                  Private Account
                </label>
              </div>
            </div>
            <p className="text-gray-base mt-2.5">
              When your account is private, only people you approve can see your
              photos and videos on Instagram. Your existing followers won't be
              affected.
            </p>
          </div>

          <div className="mt-8">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="suggestion"
                  name="suggestion"
                  type="checkbox"
                  value={suggestionCheckbox}
                  defaultChecked={suggestionCheckbox}
                  onClick={({ target }) =>
                    setSuggestionCheckbox(target.checked)
                  }
                />
              </div>
              <div className="ml-3 text-sm">
                <label
                  htmlFor="suggestion"
                  className="font-semibold text-black-light"
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
            <span className="text-gray-base font-semibold mt-2.5">Warning</span>
            <p className="text-gray-base mt-1">
              This action cannot be undone, once you delete your account, there
              is no going back. Please be certain. This will permanently delete
              the account and all the data stored for your account!
            </p>
            <button
              type="button"
              aria-label="Delete account"
              className={`font-bold text-sm text-white rounded h-8 bg-red-primary px-3 mt-4 ${
                tempDisabled && 'opacity-50 cursor-not-allowed'
              }`}
              disabled={tempDisabled}
            >
              Delete account
            </button>
          </div>
        </fieldset>
      </form>
    </article>
  );
}

PrivacyAndSecurity.defaultProps = {
  privateStatus: undefined,
  suggestedStatus: undefined,
  userDocId: undefined,
};

PrivacyAndSecurity.propTypes = {
  privateStatus: PropTypes.bool,
  suggestedStatus: PropTypes.bool,
  userDocId: PropTypes.string,
};
