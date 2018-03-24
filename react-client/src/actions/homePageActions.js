import axios from 'axios';

export const authenticateUser = userProfile => ({ type: 'USER_LOGIN', payload: { ...userProfile } });

export const attemptLogin = () => (
  dispatch => (
    axios.get('/login')
      .then((res) => {
        if (res.data) {
          dispatch(authenticateUser(res.data[0]));
        }
      })
      .catch((err) => {
        console.log(err);
      })
  )
);

export const localLogin = (username, password) => {
  console.log('login', username, password);
  return dispatch => (
    axios.post('/localLogin', { username, password })
      .then(() => {
        dispatch(attemptLogin());
      })
      .catch((err) => {
        console.log(err);
      })
  );
};

export const localSignup = (username, password) => {
  console.log('signup');
  return dispatch => (
    axios.post('/localSignup', { username, password })
      .then((res) => {
        if (!res.data.error) {
          console.log(res.data);
          dispatch(localLogin(username, password));
        }
      })
      .catch((err) => {
        console.log(err);
      })
  );
};
