/* eslint-disable no-unused-vars */
import { firebase, FieldValue } from '../lib/firebase';

/** Initializing firestore database */
const _DB = firebase.firestore();

/**
 * Function used to check if a username already exists in database. Returns `1 | 0`
 *
 * @param {string} username Username to be checked
 * @return {Promise<number>} A promise of type number.
 */
export async function doesUserExist(username) {
  const { docs } = await _DB
    .collection('users')
    .where('username', '==', username)
    .get();

  return docs.map((doc) => doc.data()).length;
}

/**
 * Function used to query data for a specific user by `username`
 *
 * @param {string} username Username to be queried by
 * @return {Promise<{}>} A promise of type object.
 */
export async function getUserDataByUsername(username) {
  const { docs } = await _DB
    .collection('users')
    .where('username', '==', username)
    .get();

  const [user] = docs.map((doc) => ({
    ...doc.data(),
    docId: doc.id,
  }));

  return user;
}

/**
 * Function used to query data for a specific user by it's user `ID`
 *
 * @param {string} userId The user id to be queried by
 * @return {Promise<{}>} A promise of type object.
 */
export async function getUserDataByUserId(userId) {
  const { docs } = await _DB
    .collection('users')
    .where('userId', '==', userId)
    .get();

  const [user] = docs.map((doc) => ({
    ...doc.data(),
    docId: doc.id,
  }));

  return user;
}

/**
 * Function used to get suggested user profiles for a specific user, queried by `userId`. It limits the queried results to `10` by default
 *
 * @param {string} userId The user id to be queried by
 * @param {string[]} userFollowing An array containing all the following users of the current user
 * @param {number} [limitQuery=25] The user id to be queried by
 *
 * @return {Promise<Array<{}>>} A promise of type object array.
 */
export async function getSuggestedProfilesByUserId(
  userId,
  userFollowing,
  limitQuery = 10,
) {
  const { docs } = await _DB.collection('users').limit(limitQuery).get();

  return docs
    .map((doc) => ({ ...doc.data(), docId: doc.id }))
    .filter(
      (profile) =>
        profile.userId !== userId && !userFollowing.includes(profile.userId),
    );
}

/**
 * Function used to get user photos by it's user `ID`. It limits the queried results to `25` by default and sorts it by newest first
 *
 * @param {string} userId The user id to be queried by
 * @param {number} [limitQuery=25] The user id to be queried by
 *
 * @return {Promise<Array<{}>>} A promise of type object array.
 */
export async function getUserPhotosByUserId(userId, limitQuery = 25) {
  const { docs } = await _DB
    .collection('photos')
    .where('userId', '==', userId)
    .limit(limitQuery)
    .get();

  return docs
    .map((doc) => ({ ...doc.data(), docId: doc.id }))
    .sort((a, b) => b.dateCreated - a.dateCreated);
}

/**
 * Function used to get all the photos of a user that is followed by current logged in user by it's `ID`
 *
 * @param {string} userId The user id of the current logged in user
 * @param {string[]} userFollowing An array containing all the following users of the current user
 *
 * @return {Promise<Array<{}>>} A promise of type object array.
 */
export async function getFollowingUserPhotosByUserId(userId, userFollowing) {
  const { docs } = await _DB
    .collection('photos')
    .where('userId', 'in', userFollowing)
    .get();

  const userFollowedPhotos = docs.map((doc) => ({
    ...doc.data(),
    docId: doc.id,
  }));

  const photosWithUserData = await Promise.all(
    userFollowedPhotos.map(async (photo) => {
      let userLikedPhoto = false;

      if (photo.likes.includes(userId)) {
        userLikedPhoto = true;
      }

      const { username, photoURL } = await getUserDataByUserId(photo.userId);

      const user = { username, photoURL };

      return { user, ...photo, userLikedPhoto };
    }),
  );

  return photosWithUserData;
}

/**
 * Function used to update the user `following field`
 *
 * @param {string} suggestedUserId The user id of the suggested profile
 * @param {string} userId The user id of the current logged in user
 * @param {boolean} [userFollowingStatus=false] The following status of the suggested profile
 *
 * @return {Promise<void>} A promise of type void.
 */
export async function updateUserFollowingField(
  suggestedUserId,
  userId,
  userFollowingStatus = false,
) {
  const { docs } = await _DB
    .collection('users')
    .where('userId', '==', userId)
    .get();

  docs.map((doc) =>
    doc.ref.update({
      following: userFollowingStatus
        ? FieldValue.arrayRemove(suggestedUserId)
        : FieldValue.arrayUnion(suggestedUserId),
    }),
  );
}

/**
 * Function used to update the user `followers field`
 *
 * @param {string} suggestedUserDocId The user document id of the suggested profile
 * @param {string} userId The user id of the current logged in user
 * @param {boolean} [userFollowingStatus=false] The following status of the suggested profile
 *
 * @return {Promise<void>} A promise of type void.
 */
export async function updateUserFollowersField(
  suggestedUserDocId,
  userId,
  userFollowingStatus = false,
) {
  _DB
    .collection('users')
    .doc(suggestedUserDocId)
    .update({
      followers: userFollowingStatus
        ? FieldValue.arrayRemove(userId)
        : FieldValue.arrayUnion(userId),
    });
}

/**
 * Function used to update the post `likes field`
 *
 * @param {string} userDocId The user document id of the post user owner
 * @param {string} userId The user id of the current logged in user
 * @param {boolean} [userLikedStatus=false] The liked status of the post
 *
 * @return {Promise<void>} A promise of type void.
 */
export async function updatePostLikesField(
  userDocId,
  userId,
  userLikedStatus = false,
) {
  _DB
    .collection('photos')
    .doc(userDocId)
    .update({
      likes: userLikedStatus
        ? FieldValue.arrayRemove(userId)
        : FieldValue.arrayUnion(userId),
    });
}

/**
 * Function used to add a comment to a given post
 *
 * @param {string} postDocId The post document id to be updated
 * @param {string} newPostComment The comment to be added
 *
 * @return {Promise<void>} A promise of type void.
 */
export async function addPostComments(postDocId, newPostComment) {
  _DB
    .collection('photos')
    .doc(postDocId)
    .update({
      comments: FieldValue.arrayUnion(newPostComment),
    });
}

/**
 * Function used to create a new post data
 *
 * @param {object} postObject The post data to be added to the collection
 *
 * @return {Promise<void>} A promise of type void.
 */
export async function createPost(postObject) {
  const result = await _DB.collection('photos').add(postObject);

  return result;
}
