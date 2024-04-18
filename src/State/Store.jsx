import { configureStore } from "@reduxjs/toolkit";
import expSlice from "./Reducers/expSlice";

const store = configureStore({
  reducer: {
    exp: expSlice,
  },
});

export default store;
