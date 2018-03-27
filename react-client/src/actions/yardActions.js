import axios from 'axios';
/* new_squaddie is dispatched from incubator actions upon egg hatch */

const setSquaddies = squaddies => ({ type: 'SET_SQUADDIES', payload: squaddies });

export const getSquaddiePosition = position => ({ type: 'GET_POSITION', payload: position });

export const fetchSquaddies = () => (
  dispatch => (
    axios.get('/userSquaddies')
      .then((res) => {
        dispatch(setSquaddies(res.data));
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
