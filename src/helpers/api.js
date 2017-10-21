import firebase from 'firebase';
import axios from 'axios';

/**
 * Configuration for  api instance
 * @type axios instance
 */
const api = axios.create({
  baseURL: '/api',
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
});

/**
 * @desc validate and login user session
 * @param  {String} [email='']
 * @param  {String} [password='']
 * @return {Promise}
 */
export const apiLogin = (email = '', password = '') => firebase.auth().signInWithEmailAndPassword(email, password);

/**
   * @desc logout authed user session
   * @return {Promise}
   */
export const apiLogout = () => firebase.auth().signOut();

/**
 * @desc get firebase config json
 * @param {String} [username]
 * @return {Promise}
 */
export const apiGetConfig = username =>
  firebase
    .database()
    .ref(`/${username}`)
    .once('value');

/**
   * @desc follow or unfollow from given username
   * @param {Object} [config]
   * @param {String} [username]
   * @param {Boolean} [destroy]
   * @return {Promise}
   */
export const apiTwitterFollowers = (config, username, destroy) =>
  api.post('https://wt-863e332a77d038d29fa50d15961b5367-0.run.webtask.io/twitter-followers', {
    config,
    username,
    destroy
  });
