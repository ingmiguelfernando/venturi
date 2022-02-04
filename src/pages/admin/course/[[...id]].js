import React from "react";
import { useRouter } from "next/router";
import { Courses } from "../../../components/Courses";

const EditCourse = () => {
  const router = useRouter();
  const courseId = router.query.id ? router.query.id[0] : null;

  return <Courses courseId={courseId} />;
};

export default EditCourse;
