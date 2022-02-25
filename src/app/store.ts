import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "../features/notification-slice";

export const store = configureStore({
    reducer: {
        notification: notificationReducer
    }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
