import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
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
