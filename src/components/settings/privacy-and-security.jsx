export default function PrivacyAndSecurity() {
  function handlePrivacyFormData(event) {
    event.preventDefault();
  }

  return (
    <article className="py-8 px-14">
      <form
        method="POST"
        className="flex flex-col"
        onSubmit={handlePrivacyFormData}
      >
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
      </form>
    </article>
  );
}
