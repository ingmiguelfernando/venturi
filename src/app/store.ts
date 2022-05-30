import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import notificationReducer from "../features/notification-slice";
import selectedCourseReducer from "../features/selectedCourse-slice";

export const store = configureStore({
  reducer: {
    notification: notificationReducer,
    selectedCourse: selectedCourseReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: true,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
