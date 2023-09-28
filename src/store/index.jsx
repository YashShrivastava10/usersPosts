import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from 'redux-saga';
import navbarSlice from "./slice/navbarSlice";
import postSlice from "./slice/postSlice";
import rootSaga from "../saga/rootSaga";
import userSlice from "./slice/userSlice";

const sagMiddleware = createSagaMiddleware();
export const Store = configureStore({
  reducer:{
    navbar: navbarSlice,
    post: postSlice,
    user: userSlice,
  },
  middleware: [sagMiddleware]
})

sagMiddleware.run(rootSaga)