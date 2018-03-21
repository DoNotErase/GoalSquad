import axios from 'axios';

/* new_squaddie is dispatched from incubator actions upon egg hatch */

const setSquaddies = squaddies => ({ type: 'SET_SQUADDIES', payload: squaddies });

module.exports.fetchSquaddies = () => (
  dispatch => (
    axios.get('/userSquaddies')
      .then((res) => {
        dispatch(setSquaddies(res.data));
      })
      .catch((err) => {
        console.log(err);
      })
  )
);

module.exports.squaddieAcknowledged = () => ({ type: 'RESET_NEW_SQUADDIE' });
