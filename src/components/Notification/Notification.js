import Snackbar from "@mui/material/Snackbar";
import Alert from '@mui/material/Alert';
import { useAppContext } from "../../context";

export const Notification = () => {
  const { errorMessage, setErrorMessage, successMessage, setSuccessMessage } =
    useAppContext();

  return (
    <>
      <Snackbar
        open={errorMessage !== ""}
        onClose={() => setErrorMessage("")}
        autoHideDuration={6000}
      >
        <Alert severity="error">{errorMessage}</Alert>
      </Snackbar>
      <Snackbar
        open={successMessage !== ""}
        onClose={() => setSuccessMessage("")}
        autoHideDuration={6000}
      >
        <Alert severity="info">{successMessage}</Alert>
      </Snackbar>
    </>
  );
};
