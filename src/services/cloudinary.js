/**
 * Function used to upload images to cloudinary cloud service using the `unsigned` preset.
 *
 * @param {object} imageFile The image file object to be uploaded
 * @param {string} folderName Name of the folder that will be created for the image
 * @param {"post"|"avatar"} [uploadType="post"] The type of the upload asset
 *
 * @return {Promise<object>} A promise of type object.
 */
export async function uploadUnsignedImage(
  imageFile,
  folderName,
  uploadType = 'post',
) {
  const formData = new FormData();
  formData.append('file', imageFile);
  formData.append(
    'upload_preset',
    process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET,
  );
  formData.append(
    'folder',
    uploadType === 'avatar'
      ? `instagram/avatars/${folderName}`
      : `instagram/posts/${folderName}`,
  );

  const result = await fetch(process.env.REACT_APP_CLOUDINARY_API_URL, {
    method: 'post',
    body: formData,
  }).then((res) => res.json());

  return result;
}
