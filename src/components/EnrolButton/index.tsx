import React from "react";
import AddModeratorOutlinedIcon from "@mui/icons-material/AddModeratorOutlined";
import PlayCircleFilledWhiteOutlinedIcon from "@mui/icons-material/PlayCircleFilledWhiteOutlined";
import Fab from "@mui/material/Fab";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

export const EnrolButton = () => {
  return (
    <Box
      position={"fixed"}
      width={250}
      bottom={16}
      right={{ xs: "calc(50% - 125px)", sm: 28 }}
      zIndex={1}
    >
      <Fab variant="extended" sx={{ paddingX: 0.5, paddingY: 1.4 }}>
        <AddModeratorOutlinedIcon fontSize="large" />
        <Typography variant="body1" pl={0.2} py={6} fontSize={22} fontWeight={100}>
          enrol this course
        </Typography>
      </Fab>
    </Box>
  );
};
