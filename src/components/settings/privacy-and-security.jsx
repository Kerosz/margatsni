import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { updateUserFieldValueByDocId } from '../../services/firebase';

export default function PrivacyAndSecurity({
  privateStatus,
  suggestedStatus,
  userDocId,
}) {
  const [privateCheckbox, setPrivateCheckbox] = useState(privateStatus);
  const [suggestionCheckbox, setSuggestionCheckbox] = useState(suggestedStatus);

  useEffect(() => {
    async function changePrivateProfileValue() {
      await updateUserFieldValueByDocId(userDocId, {
        privateProfile: privateCheckbox,
      });
    }

    if (privateCheckbox !== privateStatus) {
      changePrivateProfileValue();
    }
  }, [privateCheckbox]);

  useEffect(() => {
    async function changeAllowSuggestionsValue() {
      await updateUserFieldValueByDocId(userDocId, {
        allowSuggestions: suggestionCheckbox,
      });
    }

    if (suggestedStatus !== suggestionCheckbox) {
      changeAllowSuggestionsValue();
    }
  }, [suggestionCheckbox]);

  // TODO: Implement account deletion
  // Button temporarly disabled until the functionality is added
  const tempDisabled = true;

  return (
    <article className="py-8 px-14">
      <form className="flex flex-col">
        <fieldset className="border-b border-gray-primary pb-6">
          <legend className="font-medium text-black-light text-2xl">
            Account Privacy
          </legend>
          <div className="mt-6">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="private"
                  name="private"
                  type="checkbox"
                  value={privateCheckbox}
                  defaultChecked={privateCheckbox}
                  onChange={() =>
                    setPrivateCheckbox((prevPrivate) => !prevPrivate)
                  }
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
                  onChange={() =>
                    setSuggestionCheckbox((prevSuggestion) => !prevSuggestion)
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

PrivacyAndSecurity.propTypes = {
  privateStatus: PropTypes.bool.isRequired,
  suggestedStatus: PropTypes.bool.isRequired,
  userDocId: PropTypes.string.isRequired,
};
