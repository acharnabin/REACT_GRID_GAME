import { configureStore } from "@reduxjs/toolkit";
import Global from "./Global";

const store = configureStore({
  reducer: {
    global: Global,
  },
});

export default store
