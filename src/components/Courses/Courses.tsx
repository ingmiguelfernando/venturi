import { useState } from "react";
import { useCourse, Course } from "../../utils/dao/useCourse";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import SaveIcon from "@material-ui/icons/Save";
import Button from "@material-ui/core/Button";

export const Courses = () => {
  const [name, setName] = useState("");
  const [nameIsValid, setNameIsValid] = useState(true);

  const [featured, setFeatured] = useState(false);

  const [description, setDescription] = useState("");
  const [descriptionIsValid, setDescriptionIsValid] = useState(true);

  const [thumbnail, setThumbnail] = useState("");
  const [thumbnailIsValid, setThumbnailIsValid] = useState(true);

  const { createCourse } = useCourse();

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

    await createCourse(course)
      .then((op) => {
        debugger;
        console.log("saved:", op);
      })
      .catch((error) => {
        console.log("error:", error);
      });
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
        onChange={(e) => setDescription(e.target.value)}
      />
      <TextField
        error={!thumbnailIsValid}
        id="thumbnail-url"
        label="Thumbnail Url"
        className="w-full"
        style={{ marginTop: "20px" }}
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
