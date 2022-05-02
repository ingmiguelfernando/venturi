import React, { useEffect, useState } from "react";
import AddModeratorOutlinedIcon from "@mui/icons-material/AddModeratorOutlined";
import PlayCircleFilledWhiteOutlinedIcon from "@mui/icons-material/PlayCircleFilledWhiteOutlined";
import Fab from "@mui/material/Fab";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { useLearn } from "../../hooks/useLearn";
import { useRouter } from "next/router";

export const EnrolButton = () => {
  const { hasLearn } = useLearn();
  const router = useRouter();
  const [hasAnyLearn, setHasAnyLearn] = useState<boolean | undefined>(undefined);
  const courseId = router.query.id ? router.query.id[0] : null;

  useEffect(() => {
    if (courseId && hasAnyLearn === undefined) {
      (async () => {
        const response = await hasLearn(courseId);
        setHasAnyLearn(response);
      })();
    }
  }, [courseId, hasAnyLearn, hasLearn]);

  return (
    <Box position={"fixed"} bottom={16} right={{ xs: "calc(50% - 125px)", sm: 28 }} zIndex={1}>
      <Fab variant="extended" sx={{ paddingX: 0.5, paddingY: 1.4, minWidth: "250px" }}>
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
