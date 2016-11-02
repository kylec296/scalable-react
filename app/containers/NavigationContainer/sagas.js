// import { take, call, put, select } from 'redux-saga/effects';
import { REQUEST_TOPICS, SELECT_TOPIC, REQUEST_TOPICS_SUCCEEDED } from './constants';
import { takeLatest } from 'redux-saga';
// side effect to basically say go and call this function with these parameters
//what are side effects
import { call, put, select } from 'redux-saga/effects';
import { requestTopicsSucceeded, requestTopicsFailed } from './actions';
import { push } from 'react-router-redux';
import selectNavigationContainer from './selectors';

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

function* selectDefaultTopic() {
  const state = yield select(selectNavigationContainer());
  if(!state.selectedTopic && state.routerLocation === '/') {
    yield put(push(`/topics/${state.topics[0].name}`));
  }
}

export function* selectDefaultTopicSaga() {
  yield* takeLatest(REQUEST_TOPICS_SUCCEEDED, selectDefaultTopic);
}

function* pushTopics(action) {
 // put triggers an action and push to go and get the action
  yield put(push(`/topics/${action.topic.name}`));
}

export function* selectTopicSaga() {
  yield* takeLatest(SELECT_TOPIC, pushTopics);
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
  selectTopicSaga,
  selectDefaultTopicSaga,
];
