import Head from "next/head";
import Image from "next/image";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { EnrolButton } from "../../../components/EnrolButton";
import { CourseModules } from "../../../components/CourseModules";
import { getCourse } from "../../../features/async-thunks";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";

const CourseTitle = styled("div")(({ theme }) => ({
  position: "absolute",
  background: "rgba(0, 0, 0, 0.5)",
  borderRadius: "5px 40px 10px 5px",
  marginLeft: theme.spacing(2),
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),

  [theme.breakpoints.down("sm")]: {
    marginLeft: theme.spacing(0),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(2),
    justifyContent: "center",
    display: "flex",
  },
}));

const EditCourse = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const courseId = router.query.id?.toString() ?? null;
  const course = useAppSelector((state) => state.selectedCourse.course);

  useEffect(() => {
    if (courseId && !course) {
      (async () => {
        dispatch(getCourse(courseId));
      })();
    }
  }, [course, courseId, dispatch]);

  return course ? (
    <Grid container display="inline">
      <Head>
        <title>Venturi - Course</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Grid item sm={6}>
        <Box sx={{ p: 2 }}>
          <Image src="/venturi_logo.png" alt="me" width={320} height={70} />
        </Box>
      </Grid>
      <Grid item sm={12} position="relative" height="16rem">
        <picture>
          <Image
            src={course.imageUrl}
            alt={course.name}
            blurDataURL={course.imageUrl}
            layout="fill"
            objectFit="cover"
            objectPosition="right center"
          />
        </picture>
        <Box position="relative" height="100%" alignItems="center" display="flex">
          <CourseTitle>
            <Typography fontWeight={600} variant="h2" color="white">
              {course.name}
            </Typography>
          </CourseTitle>
        </Box>
      </Grid>
      <Grid item sm={12}>
        <CourseModules courseId={courseId} />
        <EnrolButton />
      </Grid>
    </Grid>
  ) : (
    <Typography color="secondary">Loading...</Typography>
  );
};

export default EditCourse;
