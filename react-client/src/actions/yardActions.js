import axios from 'axios';
/* new_squaddie is dispatched from incubator actions upon egg hatch */

export const fetchSquaddies = () => (
  dispatch => (
    axios.get('/userSquaddies')
      .then((res) => {
        dispatch({ type: 'SET_SQUADDIES', payload: res.data });
      })
      .catch((err) => {
        if (err.response.status === 401) {
          window.location.href = '/';
          alert('Sorry! Please log in.');
        }
      })
  )
);

export const squaddieAcknowledged = () => ({ type: 'RESET_NEW_SQUADDIE' });
