// import { take, call, put, select } from 'redux-saga/effects';
import { call, put } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import { SELECT_TOPIC } from '../NavigationContainer/constants';
import { requestLinksSucceeded, requestLinksFailed } from './actions';

function fetchLinksFromServer(topic) {
  //watch the quotes here should be slanted not straight up
  return fetch(`http://localhost:3000/api/topics/${topic.name}/links`)
    .then(response => response.json());
}

//generator function to kick off stuff not a pure function
function* fetchLinks(action) {
  try{
    const links = yield call(fetchLinksFromServer, action.topic);
    //dispatch action to store links
    yield put(requestLinksSucceeded(links));

  } catch (e) {
    //dispatch action to store error
    yield put(requestLinksFailed(e.message));
  }
}

// Individual exports for testing
// * = generator function to kick off  async stuff
export function* defaultSaga() {
  yield* takeLatest(SELECT_TOPIC, fetchLinks);
}

// All sagas to be loaded
export default [
  defaultSaga,
];
