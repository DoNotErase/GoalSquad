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
