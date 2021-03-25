/* eslint-disable camelcase */
import app from 'firebase/app';
import { v4 as uuid } from 'uuid';
import { firebase, FieldValue } from '../lib/firebase';

/** Initializing firestore database */
const _DB = firebase.firestore();

// eslint-disable-next-line no-unused-vars
async function __UNSAFE__updateFirestoreUsers(updateObject) {
  return _DB
    .collection('users')
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        doc.ref.update(updateObject);
      });
    });
}

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
 * Function used to check if an email address exists in database. Returns `1 | 0`
 *
 * @param {string} emailAddress Email address to be checked
 * @return {Promise<number>} A promise of type number.
 */
export async function doesEmailAddressExist(emailAddress) {
  const { docs } = await _DB
    .collection('users')
    .where('emailAddress', '==', emailAddress)
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
 * Function used to query data for a specific user by a `keyword`
 *
 * @param {string} keyword The search term to be queried by
 * @param {number} [limitQuery=8] Limit query results.
 * @return {Promise<{}>} A promise of type object.
 */
export async function getUserDataByKeyword(keyword, limitQuery = 8) {
  const { docs } = await _DB
    .collection('users')
    .orderBy('username')
    .startAt(keyword)
    .endAt(`${keyword}\uf8ff`)
    .limit(limitQuery)
    .get();

  return docs.map((doc) => ({ ...doc.data(), docId: doc.id }));
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
 * Function used to get all user IDs by username
 *
 * @param {string[]} usernameArray An array containing all the saved posts of the current user
 * @param {number} [limitQuery=10] Limit query results.
 *
 * @return {Promise<Array<{}>>} A promise of type object array.
 */
export async function getUserIdsByUsername(usernameArray, limitQuery = 10) {
  const { docs } = await _DB
    .collection('users')
    .where('username', 'in', usernameArray)
    .limit(limitQuery)
    .get();

  return docs
    .map((doc) => ({ ...doc.data(), docId: doc.id }))
    .map((user) => user.userId);
}

/**
 * Function used to get suggested user profiles for a specific user, queried by `userId`. It limits the queried results to `10` by default
 *
 * @param {string} userId The user id to be queried by
 * @param {string[]} userFollowing An array containing all the following users of the current user
 * @param {number} [limitQuery=5] Limit the suggested profiles query.
 *
 * @return {Promise<Array<{}>>} A promise of type object array.
 */
export async function getSuggestedProfilesByUserId(
  userId,
  userFollowing,
  limitQuery = 5,
) {
  const { docs } = await _DB
    .collection('users')
    .where('userId', '!=', userId)
    .limit(limitQuery)
    .get();

  return docs
    .map((doc) => ({ ...doc.data(), docId: doc.id }))
    .filter(
      (profile) =>
        !userFollowing.includes(profile.userId) && profile.allowSuggestions,
    );
}

/**
 * Function used to get user photos by it's user `ID`. It limits the queried results to `25` by default and sorts it by newest first
 *
 * @param {string} userId The user id to be queried by
 * @param {number} [limitQuery=25] Limit the user photos query.
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
 * @param {number} [limitQuery=20] Limit photos query.
 *
 * @return {Promise<Array<{}>>} A promise of type object array.
 */
export async function getFollowingUserPhotosByUserId(
  userId,
  userFollowing,
  limitQuery = 20,
) {
  const { docs } = await _DB
    .collection('photos')
    .where('userId', 'in', userFollowing)
    .orderBy('dateCreated', 'desc')
    .limit(limitQuery)
    .get();

  const userFollowedPhotos = docs.map((doc) => ({
    ...doc.data(),
    docId: doc.id,
  }));

  const photosWithUserData = await Promise.all(
    userFollowedPhotos.map(async (photo) => {
      let userLikedPhoto = false;
      let userSavedPhoto = false;

      if (photo.likes.includes(userId)) {
        userLikedPhoto = true;
      }

      if (photo.saved.includes(userId)) {
        userSavedPhoto = true;
      }

      const user = await getUserDataByUserId(photo.userId);

      return { user, ...photo, userLikedPhoto, userSavedPhoto };
    }),
  );

  return photosWithUserData;
}

/**
 * Function used to get all the photos that are added in the current logged in user `savedPosts` field
 *
 * @param {string[]} userSavedPosts An array containing all the saved posts of the current user
 *
 * @return {Promise<Array<{}>>} A promise of type object array.
 */
export async function getSavedPosts(userSavedPosts) {
  const { docs } = await _DB
    .collection('photos')
    .where('photoId', 'in', userSavedPosts)
    .get();

  return docs
    .map((doc) => ({ ...doc.data(), docId: doc.id }))
    .sort((a, b) => b.dateCreated - a.dateCreated);
}

/**
 * Function used to get a specific post by it's `postId`
 *
 * @param {string} postId The id of the post to be queried
 * @param {string|null} [loggedInUserId=null] The user id of the current logged in user, defaults to `null`
 *
 * @return {Promise<{}>} A promise of type object.
 */
export async function getPostWithMetaByPostId(postId, loggedInUserId = null) {
  const { docs } = await _DB
    .collection('photos')
    .where('photoId', '==', postId)
    .limit(1)
    .get();

  const [post] = docs.map((doc) => ({ ...doc.data(), docId: doc.id }));

  const user = await getUserDataByUserId(post.userId);

  let userLikedPhoto = false;
  let userSavedPhoto = false;

  if (loggedInUserId) {
    if (post.likes.includes(loggedInUserId)) {
      userLikedPhoto = true;
    }

    if (post.saved.includes(loggedInUserId)) {
      userSavedPhoto = true;
    }
  }

  return { post, user, userLikedPhoto, userSavedPhoto };
}

/**
 * Function used to get explore photos excluding loggedIn user own photos. It limits the queried results to `21` by default and sorts it by newest first
 *
 * @param {string} userId The user id to be excluded
 * @param {number} [limitQuery=21] Limit photos query.
 *
 * @return {Promise<Array<{}>>} A promise of type object array.
 */
export async function getExplorePhotos(userId, limitQuery = 21) {
  const { docs } = await _DB
    .collection('photos')
    .where('userId', '!=', userId)
    .orderBy('userId')
    .orderBy('dateCreated', 'desc')
    .limit(limitQuery)
    .get();

  const photos = docs.map((doc) => ({ ...doc.data(), docId: doc.id }));

  return photos;
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
  return _DB
    .collection('users')
    .doc(suggestedUserDocId)
    .update({
      followers: userFollowingStatus
        ? FieldValue.arrayRemove(userId)
        : FieldValue.arrayUnion(userId),
    });
}

/**
 * Function used to update the user `savedPosts field`
 *
 * @param {string} userDocId The user document id
 * @param {string} postId The post id of post to be added to saved
 * @param {boolean} [userSavedStatus=false] The saved status of the current post
 *
 * @return {Promise<void>} A promise of type void.
 */
export async function updateUserSavedPostsField(
  userDocId,
  postId,
  userSavedStatus = false,
) {
  return _DB
    .collection('users')
    .doc(userDocId)
    .update({
      savedPosts: userSavedStatus
        ? FieldValue.arrayRemove(postId)
        : FieldValue.arrayUnion(postId),
    });
}

/**
 * Function used to update the user `savedPosts field`
 *
 * @param {string} userDocId The user document id
 * @param {object} notificationObject Object data to be updated with
 *
 * @return {Promise<void>} A promise of type void.
 */
export async function updateUserNotificationField(
  userDocId,
  notificationObject,
) {
  return _DB.collection('users').doc(userDocId).update({
    notification: notificationObject,
  });
}

/**
 * Function used to update the user `field`s with a custom fields object. `WARNING` - use with caution
 *
 * @param {string} userDocId The user document id
 * @param {object} fieldValues New valeus object to be updated with
 *
 * @return {Promise<void>} A promise of type void.
 */
export async function updateUserFieldValueByDocId(userDocId, fieldValues) {
  return _DB.collection('users').doc(userDocId).update(fieldValues);
}

/**
 * Function used to update the post `likes field`
 *
 * @param {string} postDocId The post document id
 * @param {string} userId The user id of the current logged in user
 * @param {boolean} [userLikedStatus=false] The liked status of the post
 *
 * @return {Promise<void>} A promise of type void.
 */
export async function updatePostLikesField(
  postDocId,
  userId,
  userLikedStatus = false,
) {
  return _DB
    .collection('photos')
    .doc(postDocId)
    .update({
      likes: userLikedStatus
        ? FieldValue.arrayRemove(userId)
        : FieldValue.arrayUnion(userId),
    });
}

/**
 * Function used to update the post `saved field`
 *
 * @param {string} userDocId The user document id of the post user owner
 * @param {string} userId The user id of the current logged in user
 * @param {boolean} [userSavedStatus=false] The saved status of the post
 *
 * @return {Promise<void>} A promise of type void.
 */
export async function updatePostSavedField(
  userDocId,
  userId,
  userSavedStatus = false,
) {
  return _DB
    .collection('photos')
    .doc(userDocId)
    .update({
      saved: userSavedStatus
        ? FieldValue.arrayRemove(userId)
        : FieldValue.arrayUnion(userId),
    });
}

/**
 * Function used to add a comment to a given post
 *
 * @param {string} userDocId The user document ID to be updated
 * @param {object} objectData The data object to be updated with
 *
 * @return {Promise<void>} A promise of type void.
 */
export async function updateUserDataByUserId(userDocId, objectData) {
  return _DB.collection('users').doc(userDocId).update(objectData);
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
  return _DB
    .collection('photos')
    .doc(postDocId)
    .update({
      comments: FieldValue.arrayUnion(newPostComment),
    });
}

/**
 * Function used to add a message to a chat room
 *
 * @param {string} roomDocId Room document id to be updated
 * @param {string} newMessage The message to be added
 *
 * @return {Promise<void>} A promise of type void.
 */
export async function addMessageByDocId(roomDocId, newMessage) {
  return _DB
    .collection('inbox')
    .doc(roomDocId)
    .update({
      messages: FieldValue.arrayUnion(newMessage),
      dateUpdated: Date.now(),
    });
}

/**
 * Function used to create a new post data
 *
 * @param {object} postObject The post data to be added to the collection
 * @return {Promise<void>} A promise of type void.
 */
export async function createPost(postObject) {
  return _DB.collection('photos').add(postObject);
}

/**
 * Function used to create a new post data
 *
 * @param {object} roomObject The post data to be added to the collection
 * @return {Promise<void>} A promise of type void.
 */
export async function createRoom(roomObject) {
  return _DB.collection('inbox').add(roomObject);
}

/**
 * Function used to create a new user in the firestore
 *
 * @param {object} userObject The user data to be added to the collection
 *
 * @return {Promise<void>} A promise of type void.
 */
export async function createFirestoreUser(userObject) {
  return _DB.collection('users').add(userObject);
}

/**
 * Function used to create a new notification in the firestore
 *
 * @param {string} recieverId The id of the user that will recieve the notification
 * @param {string} senderPhotoURL Photo URL of the notification sender
 * @param {string} senderUsername Username of the notification sender
 * @param {'MESSAGE_NOTIFICATION'|'FOLLOW_NOTIFICATION'} [notificationType='MESSAGE_NOTIFICATION'] Type of the notification
 * @param {string} message Message to be sent
 * @param {string} targetLink The link that the notification will take you to
 *
 * @return {Promise<void>} A promise of type void.
 */
export async function createNotification({
  recieverId,
  senderPhotoURL,
  senderUsername,
  notificationType = `MESSAGE_NOTIFICATION`,
  message = `sent you a new message.`,
  targetLink = ``,
}) {
  return _DB.collection('notifications').add({
    dateCreated: Date.now(),
    userId: recieverId,
    type: notificationType,
    notificationId: uuid(),
    text: message,
    photoURL: senderPhotoURL,
    username: senderUsername,
    target: targetLink,
  });
}

/**
 * Function used to create a notification in firestore to many users
 *
 * @param {string[]} recieverIdArray An array containing all user IDs to recieve notifications
 * @param {string} senderPhotoURL Photo URL of the notification sender
 * @param {string} senderUsername Username of the notification sender
 * @param {'MESSAGE_NOTIFICATION'|'FOLLOW_NOTIFICATION'} [notificationType='MESSAGE_NOTIFICATION'] Type of the notification
 * @param {string} message Message to be sent
 * @param {string} targetLink The link that the notification will take you to
 *
 * @return {Promise<void>} A promise of type void.
 */
export async function createNotificationToMany({
  recieverIdArray,
  senderPhotoURL,
  senderUsername,
  notificationType = `MESSAGE_NOTIFICATION`,
  message = `sent you a new message.`,
  targetLink = ``,
}) {
  return Promise.all(
    recieverIdArray.map(async (recieverId) => {
      await createNotification({
        recieverId,
        notificationType,
        message,
        senderPhotoURL,
        senderUsername,
        targetLink,
      });
    }),
  );
}

/**
 * Function used to re-authentificate a user
 *
 * @param {string} userPassword The password of the current logged in user
 *
 * @return {Promise<{}>} A promise of type void.
 */
export async function reauthentificateUserWithPassword(userPassword) {
  const user = firebase.auth().currentUser;

  if (!user) throw Error('No logged in user found!');

  const credential = app.auth.EmailAuthProvider.credential(
    user.email,
    userPassword,
  );

  await user.reauthenticateWithCredential(credential);
}

/**
 * Function used to update user password. It uses `reauthentificateUserWithPassword` function.
 *
 * @param {string} currentPassword The password of the current logged in user
 * @param {string} newPassword The new password to be updated
 *
 * @return {Promise<void>} A promise of type void.
 */
export async function updateUserPassword(currentPassword, newPassword) {
  try {
    await reauthentificateUserWithPassword(currentPassword);

    try {
      const user = firebase.auth().currentUser;

      await user.updatePassword(newPassword);
    } catch (error) {
      throw Error(error);
    }
  } catch (error) {
    throw Error(error);
  }
}

/**
 * Function used to update user email address. It uses `reauthentificateUserWithPassword` function.
 *
 * @param {string} currentPassword The password of the current logged in user
 * @param {string} newEmail The email address to be updated
 *
 * @return {Promise<void>} A promise of type void.
 */
export async function updateUserEmailAddress(currentPassword, newEmail) {
  try {
    await reauthentificateUserWithPassword(currentPassword);

    try {
      const user = firebase.auth().currentUser;

      await user.updateEmail(newEmail);
    } catch (error) {
      throw Error(error);
    }
  } catch (error) {
    throw Error(error);
  }
}

/**
 * Function used to delete a user. It uses `reauthentificateUserWithPassword` function.
 *
 * @param {string} currentPassword The password of the current logged in user
 * @param {string} userDocId The user document ID to be deleted
 *
 * @return {Promise<void>} A promise of type void.
 */
export async function deleteUserAccount(currentPassword, userDocId) {
  try {
    await reauthentificateUserWithPassword(currentPassword);

    try {
      const user = firebase.auth().currentUser;

      await _DB.collection('users').doc(userDocId).delete();
      await user.delete();
    } catch (error) {
      throw Error(error);
    }
  } catch (error) {
    throw Error(error);
  }
}

/**
 * Function used to delete a post by it's document id
 *
 * @param {string} postDocId Document id of the post that is to be deleted
 * @return {Promise<void>} A promise of type void.
 */
export async function deletePostByDocId(postDocId) {
  return _DB.collection('photos').doc(postDocId).delete();
}

/**
 * Function used to delete a room by it's document id
 *
 * @param {string} roomDocId Document id of the room that is to be deleted
 * @return {Promise<void>} A promise of type void.
 */
export async function deleteRoomByDocId(roomDocId) {
  return _DB.collection('inbox').doc(roomDocId).delete();
}

/**
 * Function used to delete a notification by it's document id
 *
 * @param {string} notificationDocId Document id of the notification that is to be deleted
 * @return {Promise<void>} A promise of type void.
 */
export async function deleteNotification(notificationDocId) {
  return _DB.collection('notifications').doc(notificationDocId).delete();
}

/**
 * Function used to remove a user from a given room
 *
 * @param {string} roomDocId Document id of the room that is to be deleted
 * @param {string} userId User ID to be removed from the participants
 * @return {Promise<void>} A promise of type void.
 */
export async function deleteUserIdFromRoomParticipants(roomDocId, userId) {
  return _DB
    .collection('inbox')
    .doc(roomDocId)
    .update({
      roomParticipants: FieldValue.arrayRemove(userId),
      dateUpdated: Date.now(),
    });
}

/**
 * Function used to send a passowrd reset email
 *
 * @param {string} emailAddress The email address of the user account
 * @param {string} userAuthState The authentification state of the user, `logged in` or `not logged in`
 *
 * @return {Promise<void>} A promise of type void.
 */
export async function passwordResetByEmail(
  emailAddress,
  userAuthState = false,
) {
  let emailExists;

  if (!userAuthState) {
    emailExists = await doesEmailAddressExist(emailAddress);
  } else {
    emailExists = 1;
  }

  if (emailExists) {
    await firebase.auth().sendPasswordResetEmail(emailAddress);
  } else {
    // eslint-disable-next-line no-throw-literal
    throw { message: 'Email address entered does not exist!' };
  }
}
