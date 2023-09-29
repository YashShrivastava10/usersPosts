import { takeEvery, call, put, select } from "redux-saga/effects";
import { getPostData } from "../store/slice/postSlice";

function* getPost() {
  const response = yield call(fetch, "https://jsonplaceholder.typicode.com/posts", {
    mode: "cors",
    method: "GET",
    headers: { 'Content-Type': 'application/json' }
  });
  const data = yield response.json();
  yield put(getPostData(data))
}

function *deletePost(id){
  const posts = yield select((state) => state.post);
  try{
    const response = yield call(fetch, `https://jsonplaceholder.typicode.com/posts/${id.payload}`, {
      mode: "cors",
      method: "DELETE",
      headers: { 'Content-Type': 'application/json' }
    });
    const data = yield response.json()
    if(Object.keys(data).length === 0){
      yield put (getPostData(posts.filter(post => post.id !== id.payload)))
      alert("Deleted !!")
    }
  }
  catch(error){
    alert("Something went wrong !!")
  }
}

function* savePost(payload) {
  const type = payload.payload.type
  let method, url;
  if (type === "edit") {
    method = "PUT"
    url = `https://jsonplaceholder.typicode.com/posts/${payload.payload.id}`
  }
  else if (type === "create") {
    method = "POST"
    url = "https://jsonplaceholder.typicode.com/posts"
  }
  const posts = yield select((state) => state.post);
  const body = payload.payload.data

  try{
    const response = yield call(fetch, url, {
      mode: "cors",
      method: method,
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
      body: JSON.stringify(body)
    });
    const data = yield response.json()
    if (Object.keys(data).length > 0) {
      let updatedPosts
      if(type === "edit"){
        updatedPosts = posts.map(post => {
          if (post.id === payload.payload.id) {
            return { ...post, ...body }
          }
          else
            return post
        })
        alert("Post edited successfully !!")
      }
      else if(type === "create"){
        updatedPosts = [...posts];
        updatedPosts.push(body)
        updatedPosts.sort((a, b) => a.userId - b.userId);
        alert("Post Created Successfully !!")
      }
      yield put(getPostData(updatedPosts))
    }
  }
  catch(error){
    alert("Newly created can't be edited, since it's 'id' won't be available in DB.")
  }
}

function *postSaga(){
  yield takeEvery("posts/fetchPostData", getPost)
  yield takeEvery("posts/deletePostData", deletePost)
  yield takeEvery("posts/savePostData", savePost)
}

export default postSaga;
