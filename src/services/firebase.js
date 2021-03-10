/* eslint-disable no-unused-vars */
import { firebase } from '../lib/firebase';

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
 * Function used to query data for a specific user by it's user `ID`
 *
 * @param {string} userId The user id to be queried by
 * @return {Promise<Array<{}>>} A promise of type object array.
 */
export async function getUserDataByUserId(userId) {
  const { docs } = await _DB
    .collection('users')
    .where('userId', '==', userId)
    .get();

  const user = docs.map((doc) => ({
    ...doc.data(),
    docId: doc.id,
  }));

  return user;
}

export async function getSuggestedProfilesByUserId(userId) {
  const result = await _DB.collection('users').limit(10).get();

  console.log(result);

  return result;
}
