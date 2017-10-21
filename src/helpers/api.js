import Twitter from 'twitter';
import firebase from 'firebase';

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
export const apiTwitterFollowers = (config, username, destroy) => {
  const T = new Twitter(config);
  const params = {
    cursor: '-1',
    screen_name: username,
    count: 100
  };
  return new Promise((resolve, reject) => {
    T.get('followers/ids', params, (err, data, response) => {
      if (err) {
        console.log(err);
        reject(err);
        return;
      }
      let count = {
        success: 0,
        error: 0
      };
      let message = destroy ? 'unfollowed' : 'followed';

      for (let i = 0; i < data.ids.length; i++) {
        const url = destroy ? 'friendships/destroy' : 'friendships/create';
        let id = { id: data.ids[i] };

        T.post(url, id, (err, response) => {
          if (err) {
            count.error += 1;
            console.log(err[0].message);
            reject(err[0].message);
            return;
          }
          count.success += 1;
          console.log(`${message} ${response.name}| Profile: https://twitter.com/${response.screen_name}`);
        });
      }
      resolve(`Successfully ${message} ${count.success} users`);
    });
  });
};
