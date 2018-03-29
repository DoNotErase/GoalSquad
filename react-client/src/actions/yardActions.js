import axios from 'axios';
/* new_squaddie is dispatched from incubator actions upon egg hatch */

const handleErr = (err) => {
  if (err.response && err.response.status === 401) {
    window.location.href = '/';
    alert('Sorry! Please log in.');
  } else {
    console.log(err);
  }
};

export const fetchSquaddies = () => (
  dispatch => (
    axios.get('/userSquaddies')
      .then((res) => {
        dispatch({ type: 'SET_SQUADDIES', payload: res.data });
      })
      .catch((err) => { handleErr(err); })
  )
);

export const squaddieAcknowledged = () => ({ type: 'RESET_NEW_SQUADDIE' });
