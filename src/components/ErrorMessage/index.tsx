import React from "react";
import { Typography } from "@mui/material";

export const ErrorMessage = ({ errors, name }) => {
  return errors[name] ? (
    <Typography variant="caption" color="error" component={"span"}>
      {errors[name].message}
    </Typography>
  ) : null;
};
