import { createAction, createSlice } from "@reduxjs/toolkit";

export const fetchUserData = createAction("users/fetchUserData");
export const deleteUserData = createAction("users/deleteUserData");
export const saveUserData = createAction("users/saveUserData");

const UserSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    getUserData(state, action){
      return action.payload
    },
  }
})

export default UserSlice.reducer;

export const { getUserData } = UserSlice.actions;
