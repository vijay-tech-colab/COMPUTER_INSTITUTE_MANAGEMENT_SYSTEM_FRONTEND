import { configureStore } from "@reduxjs/toolkit";
import admissionReducer from "./slices/admissionSlice";
import studentReducer from "./slices/studentSlice";

export const store = configureStore({
  reducer: {
    admissions: admissionReducer,
    students: studentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
