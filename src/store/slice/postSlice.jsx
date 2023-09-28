import { createAction, createSlice } from "@reduxjs/toolkit";

export const fetchPostData = createAction("posts/fetchPostData");
export const deletePostData = createAction("posts/deletePostData");
export const savePostData = createAction("posts/savePostData");

const PostSlice = createSlice({
  name: "posts",
  initialState: [],
  reducers: {
    getPostData(state, action){
      return action.payload
    },
  }
})

export default PostSlice.reducer;

export const { getPostData } = PostSlice.actions;
