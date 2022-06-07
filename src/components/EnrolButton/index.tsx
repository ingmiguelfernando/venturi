import React, { useEffect } from "react";
import AddModeratorOutlinedIcon from "@mui/icons-material/AddModeratorOutlined";
import PlayCircleFilledWhiteOutlinedIcon from "@mui/icons-material/PlayCircleFilledWhiteOutlined";
import Fab from "@mui/material/Fab";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getLearnByCourseId } from "../../features/async-thunks";

export const EnrolButton = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const learnId = useAppSelector((state) => state.selectedCourse?.learn?.id ?? false);
  const hasAnyLearn = useAppSelector((state) => state.selectedCourse?.learn);
  const courseId = router.query.id?.toString() ?? null;

  useEffect(() => {
    if (courseId && hasAnyLearn === undefined) {
      (async () => {
        dispatch(getLearnByCourseId(courseId));
      })();
    }
  }, [courseId, dispatch, hasAnyLearn]);

  return (
    <Box position={"fixed"} bottom={16} right={{ xs: "calc(50% - 125px)", sm: 28 }} zIndex={1}>
      <Fab
        variant="extended"
        sx={{ paddingX: 0.5, paddingY: 1.4, minWidth: "250px" }}
        onClick={() => router.push(`${router.asPath}/learn/${learnId}`)}
      >
        {hasAnyLearn ? (
          <PlayCircleFilledWhiteOutlinedIcon fontSize="large" />
        ) : (
          <AddModeratorOutlinedIcon fontSize="large" />
        )}
        <Typography variant="body1" pl={0.2} py={6} fontSize={22} fontWeight={100}>
          {hasAnyLearn ? "Continue" : "Enrol Now"}
        </Typography>
      </Fab>
    </Box>
  );
};
