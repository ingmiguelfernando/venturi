import React from "react";
import Alert from "@mui/material/Alert";
import { AlertTitle } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { resetNotification } from "../../features/notification-slice";

export const Notification = () => {
  const { message, type, duration } = useAppSelector((state) => state.notification);
  const dispatch = useAppDispatch();
  return (
    <Snackbar
      open={message !== ""}
      onClose={() => dispatch(resetNotification())}
      autoHideDuration={duration}
    >
      {message !== "" ? (
        <Alert severity={type}>
          <AlertTitle style={{ textTransform: "capitalize" }}>{type}</AlertTitle>
          {message}
        </Alert>
      ) : null}
    </Snackbar>
  );
};
