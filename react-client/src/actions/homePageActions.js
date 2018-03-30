import axios from 'axios';

export const attemptLogin = () => (
  dispatch => (
    axios.get('/login')
      .then((res) => {
        if (res.data) {
          dispatch({ type: 'USER_LOGIN', payload: { ...res.data[0] } });
        }
      })
      .catch((err) => {
        console.log(err);
      })
  )
);

const errMessage = message => ({ type: 'ERR_MESSAGE', payload: message });

export const localLogin = (username, password) => (
  dispatch => (
    axios.post('/localLogin', { username, password })
      .then(() => {
        dispatch(attemptLogin());
      })
      .catch((err) => {
        dispatch(errMessage('Please check your credentials and try again'));
        console.log(err);
      })
  )
);


export const localSignup = (username, password) => (
  dispatch => (
    axios.post('/localSignup', { username, password })
      .then((res) => {
        if (!res.data.error) {
          dispatch(localLogin(username, password));
        } else {
          dispatch(errMessage(res.data.error));
        }
      })
      .catch((err) => {
        console.log(err);
      })
  )
);

export const setPushNotificationsToFalse = userID => (
  dispatch => (
    axios.patch('/setPushNotificationToFalse', { userID: userID })
      .then(() => {
        // update userInfo with dispatch call
        console.log('Succssfully updated user push notification preference to false')
      })
      .catch((err) => { console.log('Unable to update user push notification preference', err) })
  )
)

export const setPushNotificationsToTrue = userID => (
  dispatch => (
    axios.patch('/setPushNotificationToTrue', { userID: userID })
      .then(() => {
        // update userInfo with dispatch call
        console.log('Succssfully updated user push notification preference to true')
      })
      .catch((err) => { console.log('Unable to update user push notification preference', err) })
  )
)


