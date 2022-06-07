import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../../../app/hooks";
import { CourseContent } from "../../../../components/Learn/CourseContent";
import {
  getCourse,
  getModulesByCourseId,
  getSegmentsByModuleIds,
  getLearnByCourseId,
} from "../../../../features/async-thunks";

export const LearnRoute = () => {
  const router = useRouter();

  const dispatch = useAppDispatch();
  const { id, learnId } = router.query;
  const { course, modules, segments, learn } = useAppSelector((state) => state.selectedCourse);

  useEffect(() => {
    if (course === undefined && id) {
      dispatch(getCourse(id as string));
    }
  }, [course, dispatch, id]);

  useEffect(() => {
    if (course && id && modules === undefined) {
      dispatch(getModulesByCourseId(id as string));
    }
  }, [course, dispatch, id, modules]);

  useEffect(() => {
    if (course && id && modules && segments === undefined) {
      const modulesIds = modules.map((module) => module.id);
      dispatch(getSegmentsByModuleIds(modulesIds));
    }
  }, [course, dispatch, id, modules, segments]);

  useEffect(() => {
    if (course && id && modules && segments && learn === undefined) {
      dispatch(getLearnByCourseId(id as string));
    }
  }, [course, dispatch, id, learn, modules, segments]);

  console.log(id, learnId);

  return (
    <div>
      learn-id-{learnId}
      {course && modules && segments && (
        <CourseContent modules={modules} segments={segments} learn={learn} />
      )}
    </div>
  );
};

export default LearnRoute;
