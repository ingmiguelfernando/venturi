import React from "react";
import { useRouter } from "next/router";


const EditCourse = () => {
    const router = useRouter();
    const courseId = router.query.id ? router.query.id[0] : null;

    return <div>{`hola: ${courseId}`}</div>;
};

export default EditCourse;