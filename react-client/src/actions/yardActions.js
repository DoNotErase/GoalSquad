import axios from 'axios';

/* new_squaddie is dispatched from incubator actions upon egg hatch */

const setSquaddies = squaddies => ({ type: 'SET_SQUADDIES', payload: squaddies });

module.exports.fetchSquaddies = () => (
  dispatch => (
    axios.get('/userSquaddies')
      .then((res) => {
        console.log('action data', res.data)
        dispatch(setSquaddies(res.data));
      })
      .catch((err) => {
        if (err.response.status === 401) {
          axios.get('/');
        }
      })
  )
);

// const setSquaddie = squaddie => ({ type: 'NEW_SQUADDIE', payload: squaddie });

// module.exports.fetchSquaddie = () => (
//   dispatch => (
//     axios.get('/getSquaddie')
//       .then(res => {
//         console.log('squaddie data', res)
//         dispatch(setSquaddie(res.data));
//       })
//       .catch(err => {
//         if(err.response.status === 401) {
//           axios.get('/');
//         }
//       })
//   )
// );

module.exports.squaddieAcknowledged = () => ({ type: 'RESET_NEW_SQUADDIE' });
