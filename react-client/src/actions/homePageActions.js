import axios from 'axios';
import getLifetimeData from './actions';

export const authenticateUser = userProfile => ({ type: 'USER_LOGIN', payload: { ...userProfile } });

export const attemptLogin = () => (
  dispatch => (
    axios.get('/login')
      .then((res) => {
        if (res.data) {
          dispatch(authenticateUser(res.data[0]));
          dispatch(getLifetimeData);
        }
      })
      .catch((err) => {
        console.log(err);
      })
  )
);
