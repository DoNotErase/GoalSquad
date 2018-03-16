import axios from 'axios';

export const authenticateUser = userProfile => ({ type: 'USER_LOGIN', payload: { ...userProfile } });

export const attemptLogin = () => (
  dispatch => (
    axios.get('/login')
      .then((res) => {
        if (res.data) {
          console.log('dispatching user');
          dispatch(authenticateUser(res.data[0]));
        } else {
          console.log('no user');
        }
      })
      .catch((err) => {
        console.log(err);
      })
  )
);
