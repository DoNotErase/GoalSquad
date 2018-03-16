import axios from 'axios';

export const authenticateUser = userProfile => ({ type: 'USER_LOGIN', payload: { ...userProfile } });

export const attemptLogin = () => (
  dispatch => (
    axios.get('/login')
      .then(res => (dispatch(authenticateUser(res.data))))
      .catch((err) => {
        console.log(err);
      })
  )
);
