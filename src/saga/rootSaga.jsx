import { all } from "redux-saga/effects";
import postSaga from "./postSaga";
import userSaga from "./userSaga";

function* rootSaga(){
  yield all([postSaga(), userSaga()])
}

export default rootSaga;