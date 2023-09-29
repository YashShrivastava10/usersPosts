import { takeEvery, call, put, select } from "redux-saga/effects";
import { getUserData } from "../store/slice/userSlice";

function* getUser() {
  const response = yield call(fetch, "https://jsonplaceholder.typicode.com/users", {
    mode: "cors",
    method: "GET",
    headers: { 'Content-Type': 'application/json' }
  });
  const data = yield response.json();
  yield put(getUserData(data))
}

function* deleteUser(id) {
  const users = yield select((state) => state.user);
  try{
    const response = yield call(fetch, `https://jsonplaceholder.typicode.com/posts/${id.payload}`, {
      mode: "cors",
      method: "DELETE",
      headers: { 'Content-Type': 'application/json' }
    });
    const data = yield response.json()
    if (Object.keys(data).length === 0) {
      yield put(getUserData(users.filter(user => user.id !== id.payload)))
    }
    alert("Deleted !!")
  }
  catch(error){
    alert("Something went wrong !!")
  }
}

function* saveUser(payload) {
  const type = payload.payload.type
  let method, url;
  if (type === "edit") {
    method = "PUT"
    url = `https://jsonplaceholder.typicode.com/users/${payload.payload.id}`
  }
  else if (type === "create") {
    method = "POST"
    url = "https://jsonplaceholder.typicode.com/users"
  }
  const users = yield select((state) => state.user);
  const body = payload.payload.data

  try{
    const response = yield call(fetch, url, {
      mode: "cors",
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    const data = yield response.json()
    if (Object.keys(data).length > 0) {
      let updatedUsers
      if(type === "edit"){
        updatedUsers = users.map(user => {
          if (user.id === payload.payload.id) {
            return { ...user, ...body }
          }
          else
            return user
        })
        alert("User edited successfully !!")
      }
      else if(type === "create"){
        updatedUsers = structuredClone(users)
        updatedUsers.push(body)
        alert("User Created Successfully !!")
      }
      yield put(getUserData(updatedUsers))
    }
  }
  catch(error){
    alert("Newly created can't be edited, since it's 'id' won't be available in DB.")
  }
}

function* userSaga() {
  yield takeEvery("users/fetchUserData", getUser)
  yield takeEvery("users/deleteUserData", deleteUser)
  yield takeEvery("users/saveUserData", saveUser)
}

export default userSaga;
