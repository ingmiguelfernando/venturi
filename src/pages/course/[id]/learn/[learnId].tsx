import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../../../app/hooks";
import { CourseContent } from "../../../../components/Learn/CourseContent";
import { getCourse } from "../../../../features/selectedCourse-slice";

export const LearnRoute = () => {
  const router = useRouter();

  const dispatch = useAppDispatch();
  const { id, learnId } = router.query;
  const course = useAppSelector((state) => state.selectedCourse.course);

  useEffect(() => {
    if (!course && id) {
      dispatch(getCourse(id as string));
    }
  }, [course, dispatch, id]);

  console.log(id, learnId);

  return (
    <div>
      learn-id-{learnId}
      <CourseContent />
    </div>
  );
};

export default LearnRoute;
