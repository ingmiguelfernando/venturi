import { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import SaveIcon from "@material-ui/icons/Save";
import Button from "@material-ui/core/Button";

export const Courses = () => {
  const [name, setName] = useState("");
  const [featured, setFeatured] = useState(false);
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState("");

  const onSave = () => {
    console.log(featured);
    console.log(name);
    console.log(description);
    console.log(thumbnail);
  };

  return (
    <form className="bg-white m-10 p-10 w-full" noValidate autoComplete="off">
      <div>
        <TextField
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
        multiline
        variant="outlined"
        rows={4}
        style={{ marginTop: "20px" }}
        className="w-full"
        onChange={(e) => setDescription(e.target.value)}
      />
      <TextField
        id="thumbnail-url"
        label="Thumbnail Url"
        className="w-full"
        style={{ marginTop: "20px" }}
        onChange={(e) => setThumbnail(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        size="large"
        startIcon={<SaveIcon />}
        style={{ marginTop: "20px" }}
        onClick={onSave}
      >
        Save
      </Button>
      <Button
        variant="contained"
        color="primary"
        size="large"
        style={{ marginTop: "20px", marginLeft: "20px" }}
      >
        Cancel
      </Button>
    </form>
  );
};
