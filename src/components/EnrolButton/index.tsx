import React, { useEffect, useState } from "react";
import AddModeratorOutlinedIcon from "@mui/icons-material/AddModeratorOutlined";
import PlayCircleFilledWhiteOutlinedIcon from "@mui/icons-material/PlayCircleFilledWhiteOutlined";
import Fab from "@mui/material/Fab";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { useLearn } from "../../hooks/useLearn";
import { useRouter } from "next/router";
import { useAppSelector } from "../../app/hooks";

export const EnrolButton = () => {
  const router = useRouter();
  const { getLearnByCourseId } = useLearn();
  const learnId = useAppSelector((state) => state.selectedCourse?.learn?.id ?? false);
  const courseId = router.query.id?.toString() ?? null;
  const [hasAnyLearn, setHasAnyLearn] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    if (courseId && hasAnyLearn === undefined) {
      (async () => {
        const response = await getLearnByCourseId(courseId);
        setHasAnyLearn(response && response.length > 0);
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId]);

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
