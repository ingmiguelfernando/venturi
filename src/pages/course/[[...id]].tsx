import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Course, useCourse } from "../../hooks/useCourse";
import Head from "next/head";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";

import Image from "next/image";
import { styled } from "@mui/material/styles";
import { CourseModules } from "../../components/CourseModules";

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
  const { getCourse } = useCourse();
  const [course, setCourse] = useState<Course | null>(null);
  const courseId = router.query.id ? router.query.id[0] : null;

  useEffect(() => {
    if (courseId && !course) {
      (async () => {
        const course = await getCourse(courseId);
        if (course) {
          setCourse(course);
        }
      })();
    }
  }, [course, courseId, getCourse]);

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
      </Grid>
    </Grid>
  ) : (
    <Typography color="secondary">Loading...</Typography>
  );
};

export default EditCourse;
