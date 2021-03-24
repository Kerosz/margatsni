/* eslint-disable no-unused-vars */
import { useState } from 'react';
import PropTypes from 'prop-types';
import Toast from '../toast';
import Modal from '../modal';
import useUpdateEffect from '../../hooks/use-update-effect';
import useDisclosure from '../../hooks/use-disclosure';
import {
  updateUserFieldValueByDocId,
  deleteUserAccount,
} from '../../services/firebase';

export default function PrivacyAndSecurity({
  privateStatus,
  suggestedStatus,
  userDocId,
  userEmail,
}) {
  const {
    isOpen: modalIsOpen,
    onClose: modalOnClose,
    onOpen: modalOnOpen,
  } = useDisclosure();
  const {
    isOpen: toastIsOpen,
    onClose: toastOnClose,
    onOpen: toastOnOpen,
  } = useDisclosure();

  const [privateCheckbox, setPrivateCheckbox] = useState(privateStatus);
  const [suggestionCheckbox, setSuggestionCheckbox] = useState(suggestedStatus);
  const [confirmDialogState, setConfirmDialog] = useState('');
  const [serverError, setServerError] = useState(null);

  const isConfirmDialogValid =
    confirmDialogState.length >= 6 && confirmDialogState.length <= 24;

  function handleModalClose() {
    modalOnClose();
    setConfirmDialog('');
    setServerError(null);
  }

  /** Handle submit for private account checkbox on input change */
  useUpdateEffect(() => {
    async function changePrivateProfileValue() {
      await updateUserFieldValueByDocId(userDocId, {
        privateProfile: privateCheckbox,
      });

      toastOnOpen();
    }

    if (privateCheckbox !== privateStatus) {
      changePrivateProfileValue();
    }
  }, [privateCheckbox]);

  /** Handle submit for allow suggestion checkbox on input change */
  useUpdateEffect(() => {
    async function changeAllowSuggestionsValue() {
      await updateUserFieldValueByDocId(userDocId, {
        allowSuggestions: suggestionCheckbox,
      });

      toastOnOpen();
    }

    if (suggestionCheckbox !== suggestedStatus) {
      changeAllowSuggestionsValue();
    }
  }, [suggestionCheckbox]);

  /** Handles the logic for account deletion */
  async function handleAccountDeletion(event) {
    event.preventDefault();

    if (isConfirmDialogValid) {
      setServerError(null);
      try {
        await deleteUserAccount(confirmDialogState, userDocId);
        handleModalClose();
      } catch (error) {
        setServerError(error.message);
      }
    }
  }

  return (
    <article>
      <Toast isOpen={toastIsOpen} onClose={toastOnClose}>
        <p>Settings saved</p>
      </Toast>

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
                  onClick={({ target }) => setPrivateCheckbox(target.checked)}
                  className="focus:ring-blue-500 h-4 w-4 text-blue-medium border-gray-300 rounded"
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
                  className="focus:ring-blue-500 h-4 w-4 text-blue-medium border-gray-300 rounded"
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
              className="font-semibold text-sm bg-white text-red-primary border border-red-primary rounded h-8 px-3 mt-4"
              onClick={modalOnOpen}
            >
              Delete account
            </button>
          </div>
        </fieldset>
      </form>

      <Modal onClose={handleModalClose} isOpen={modalIsOpen}>
        <form
          action="POST"
          className="flex flex-col items-center sm:px-8 px-3 py-4"
          onSubmit={handleAccountDeletion}
        >
          <p className="text-xl mt-4 font-semibold text-black-light">
            Are you absolutely sure?
          </p>
          <svg
            className="w-16 text-black-light border-2 border-black-light rounded-full p-3 mt-3"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>

          <p className="mt-5 text-gray-base">
            This action will <strong>permanently</strong> delete all your
            account data. There is no possible way of getting your account back.
            Upon confirmation of this action the{' '}
            <strong>account and all it's data will be deleted</strong> and you
            will be redirected to the homepage.
          </p>

          <p className="mt-6 text-gray-base self-start">
            Please type the password for <strong>{userEmail}</strong> to
            confirm.
          </p>

          {serverError && (
            <p className="pl-1 mt-2 text-xs text-red-primary self-start">
              {serverError}
            </p>
          )}
          <input
            type="password"
            name="confirmDialog"
            className="rounded focus:ring-gray-600 border border-gray-primary px-2.5 py-1.5 text-lg focus:border-gray-400 bg-gray-50 mt-3 w-full focus:outline-none"
            value={confirmDialogState}
            onChange={({ target }) => setConfirmDialog(target.value)}
          />
          <button
            type="submit"
            aria-label="Confirm deletion of account"
            className={`font-bold text-sm text-white rounded h-8 bg-red-primary px-3 mt-4 w-full ${
              !isConfirmDialogValid && 'opacity-50 cursor-not-allowed'
            }`}
            disabled={!isConfirmDialogValid}
            onClick={handleAccountDeletion}
          >
            I understand, delete my account
          </button>
        </form>
      </Modal>
    </article>
  );
}

PrivacyAndSecurity.defaultProps = {
  privateStatus: undefined,
  suggestedStatus: undefined,
  userDocId: undefined,
  userEmail: undefined,
};

PrivacyAndSecurity.propTypes = {
  privateStatus: PropTypes.bool,
  suggestedStatus: PropTypes.bool,
  userDocId: PropTypes.string,
  userEmail: PropTypes.string,
};
