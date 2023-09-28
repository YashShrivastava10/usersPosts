import { createSlice } from "@reduxjs/toolkit";

const navbarSlice = createSlice({
  name: "navbar",
  initialState: "POST",
  reducers:{
    changeRoute(state, action){
      return action.payload;
    }
  }
})
export default navbarSlice.reducer;

export const { changeRoute } = navbarSlice.actions;

