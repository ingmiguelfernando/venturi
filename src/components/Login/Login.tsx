import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
// import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

export const Login = () => {
  return (
    <div className="bg-white opacity-95 w-96 h-96 rounded p-12">
      <h1 className="text-3xl opacity-100">Login</h1>
      <div className="text-center opacity-100">
        <div className="pt-6 py-4">
          <TextField
            id="email-address-input"
            label="Email address"
            type="email"
            variant="filled"
            autoComplete=""
            className="w-72"
          />
        </div>
        <div>
          <TextField
            id="password-input"
            label="Password"
            type="password"
            variant="filled"
            autoComplete="current-password"
            className="w-72"
          />
        </div>
        <div className="pt-8">
          <Button className="w-72 h-10" variant="contained" color="primary">
            Enter
          </Button>
        </div>
      </div>
    </div>
  );
};
