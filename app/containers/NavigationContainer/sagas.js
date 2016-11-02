// import { take, call, put, select } from 'redux-saga/effects';
import { REQUEST_TOPICS } from './constants';
import { takeLatest } from 'redux-saga';
// side effect to basically say go and call this function with these parameters
//what are side effects
import { call, put } from 'redux-saga/effects';
import { requestTopicsSucceeded, requestTopicsFailed } from './actions';

export function fetchTopicFromServer() {
  return fetch('http://localhost:3000/api/topics')
    .then(response => response.json());
}

//figure out why the * is put there for sagas
function* fetchTopics() {
  try {
    //call side effect to go and fetchTopics from the server
    const topics = yield call(fetchTopicFromServer);
    // put side effect causes requestTopicsSucceeded to be dispatched to put the topics into state
    yield put(requestTopicsSucceeded(topics));
  } catch (e) {
    yield put(requestTopicsFailed(e.message));
  }

}

// Individual exports for testing
export function* fetchTopicSaga() {
  //basically saying wait around till you recieve this REQUEST_TOPICS action to get fired then call fetchTopics
  yield* takeLatest(REQUEST_TOPICS, fetchTopics);
  return;
}

// All sagas to be loaded
export default [
  fetchTopicSaga,
];
