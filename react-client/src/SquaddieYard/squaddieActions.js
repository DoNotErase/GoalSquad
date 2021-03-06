import axios from 'axios';

const isLoading = () => ({ type: 'IS_LOADING', payload: true });
const doneLoading = () => ({ type: 'DONE_LOADING', payload: false });

const yardLoading = () => ({ type: 'YARD_LOADING', payload: true });
const yardDoneLoading = () => ({ type: 'YARD_DONE_LOADING', payload: false });

let alerted = false;
const handleErr = (err) => {
  if (err.response && err.response.status === 401 && !alerted) {
    window.location.href = '/';
    alerted = true;
    alert('Sorry! Please log in.');
  } else {
    console.log(err);
  }
};

const setSquaddies = squaddieData => ({
  type: 'GET_SQUADDIES',
  payload: squaddieData,
});

const setYardSquaddies = yardSquaddieData => ({
  type: 'GET_YARD_SQUADDIES',
  payload: yardSquaddieData,
});

const toggleYardSquaddies = squaddieData => ({
  type: 'TOGGLE_YARD_STATUS',
  payload: squaddieData,
});

export const saveSquaddiePosition = position => (
  dispatch => (
    axios.patch('/saveposition', { pos: position })
      .then((res) => {
        dispatch(res.data);
      })
      .catch((err) => { handleErr(err); })
  )
);

export const getUserSquaddies = () => (
  (dispatch) => {
    dispatch(isLoading());
    return axios.get('/squaddies')
      .then((res) => {
        dispatch(setSquaddies(res.data));
        dispatch(doneLoading());
      })
      .catch((err) => {
        handleErr(err);
      });
  }
);

export const getYardSquaddies = () => (
  dispatch => (
    axios.get('/yardSquad')
      .then((res) => {
        dispatch(setYardSquaddies(res.data));
      })
      .catch((err) => { handleErr(err); })
  )
);

// testing why remove from yard and add to yard does not work
// for toggleYardStatus
export const getUserSquaddies2 = () => (
  dispatch => axios.get('/squaddies')
    .then((res) => {
      dispatch(setSquaddies(res.data));
    })
    .catch((err) => {
      handleErr(err);
    })
);

export const toggleYardStatus = userMonsterID => (
  (dispatch) => {
    dispatch(yardLoading());
    return axios.patch('/yardSquad', { monID: userMonsterID })
      .then(() => {
        dispatch(yardDoneLoading());
        dispatch(getUserSquaddies2());
      })
      .catch((err) => { handleErr(err); });
  }
);

export const changeName = (userMonsterID, newName) => (
  () => (
    axios.patch('/squaddie', {
      monID: userMonsterID,
      name: newName,
    })
      .catch((err) => { handleErr(err); })
  )
);

export const squaddieAcknowledged = () => ({ type: 'RESET_NEW_SQUADDIE' });

