import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useCourse, Course } from "../../utils/dao/useCourse";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import SaveIcon from "@material-ui/icons/Save";
import Button from "@material-ui/core/Button";

export const Courses = ({ courseId }: { courseId?: string }) => {
  const router = useRouter();

  const [name, setName] = useState("");
  const [nameIsValid, setNameIsValid] = useState(true);

  const [featured, setFeatured] = useState(false);

  const [description, setDescription] = useState("");
  const [descriptionIsValid, setDescriptionIsValid] = useState(true);

  const [thumbnail, setThumbnail] = useState("");
  const [thumbnailIsValid, setThumbnailIsValid] = useState(true);

  const { createCourse, updateCourse, getCourse } = useCourse();

  const goGridPage = () => router.push("/admin");

  useEffect(() => {
    if (courseId) {
      const fetchCourse = async () => {
        const { name, featured, description, imageUrl } = await getCourse(
          courseId
        );
        setName(name);
        setFeatured(featured);
        setDescription(description);
        setThumbnail(imageUrl);
      };
      fetchCourse();
    }
  }, [courseId]);

  const onSave = async () => {
    setNameIsValid(!!name);
    setDescriptionIsValid(!!description);
    setThumbnailIsValid(!!thumbnail);

    if (!nameIsValid || !descriptionIsValid || !thumbnailIsValid) {
      return;
    }

    const course: Course = {
      name,
      description,
      featured,
      imageUrl: thumbnail,
    };
    if (courseId) {
      course.id = courseId;
      await updateCourse(course)
        .then((op) => {
          console.log("updated:", op);
          goGridPage();
        })
        .catch((error) => {
          console.log("error:", error);
        });
    } else {
      await createCourse(course)
        .then((op) => {
          console.log("saved:", op);
          goGridPage();
        })
        .catch((error) => {
          console.log("error:", error);
        });
    }
  };

  return (
    <form
      className="bg-white m-10 p-10 w-full rounded-tr-3xl rounded-sm"
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          error={!nameIsValid}
          className="w-3/4"
          id="name"
          label="Course Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              name="is-featured"
              color="primary"
            />
          }
          label="Featured"
          className="pl-6"
        />
      </div>
      <TextField
        id="description"
        label="Description"
        error={!descriptionIsValid}
        multiline
        variant="outlined"
        rows={4}
        style={{ marginTop: "20px" }}
        className="w-full"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <TextField
        error={!thumbnailIsValid}
        id="thumbnail-url"
        label="Thumbnail Url"
        className="w-full"
        style={{ marginTop: "20px" }}
        value={thumbnail}
        onChange={(e) => setThumbnail(e.target.value)}
      />
      <Button
        variant="contained"
        className="bg-gray-800 text-white"
        size="large"
        startIcon={<SaveIcon />}
        style={{ marginTop: "20px" }}
        onClick={onSave}
      >
        Save
      </Button>
      <Button
        variant="contained"
        className="bg-gray-800 text-white"
        color="primary"
        size="large"
        style={{ marginTop: "20px", marginLeft: "20px" }}
        onClick={goGridPage}
      >
        Cancel
      </Button>

      <div
        hidden={nameIsValid && descriptionIsValid && thumbnailIsValid}
        className="text-red-500 font-light text-base pt-3"
      >
        Please enter a value.
      </div>
    </form>
  );
};
