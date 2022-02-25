import { AlertColor } from "@mui/material";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface NotificationState {
    message: string;
    type: AlertColor;
    duration?: number;
}

const initialState: NotificationState = {
    message: "",
    type: "info",
    duration: 0
};

const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        showNotification: (state, action: PayloadAction<NotificationState>) => {
            state.message = action.payload.message;
            state.type = action.payload.type;
            state.duration = action.payload.duration ?? 5000;
        },
        resetNotification: (state) => {
            state.message = "";
            state.type = "info";
            state.duration = 0;
        }
    }
});

export const { showNotification, resetNotification } = notificationSlice.actions;
export default notificationSlice.reducer;

