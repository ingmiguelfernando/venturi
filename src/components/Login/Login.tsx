import { useState } from "react";
import cx from "classnames";
import TextField from "@material-ui/core/TextField";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import FilledInput from "@material-ui/core/FilledInput";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { useAppContext } from "../../context";

export const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { login, signIn } = useAppContext();

  // Email
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [emailMsgError, setEmailMsgError] = useState("");

  // Password
  const [password, setPassword] = useState("");
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [passwordMsgError, setPasswordMsgError] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  function ValidateEmail() {
    const isValid = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email);
    setIsValidEmail(isValid);
    setEmailMsgError(isValid ? "" : "Please enter a valid email.");
  }

  function ValidatePassword() {
    const isValid = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);
    setIsValidPassword(isValid);
    setPasswordMsgError(
      isValid
        ? ""
        : "Your password must contain minimum eight characters, at least one letter and one number."
    );
  }

  function AccesApp() {
    if (email === "" || !isValidEmail || password === "" || !isValidPassword) {
      return;
    }

    if (isLogin) {
      login(email, password);
    }

    if (!isLogin) {
      signIn(email, password).then(() => {
        setIsLogin(true);
      });
    }
  }

  return (
    <div className="bg-white opacity-95 h-96 rounded p-12">
      <h1 className="text-3xl opacity-100">
        {`${isLogin ? "Login" : "Sign In"} `}
      </h1>
      <div className="text-center opacity-100">
        <div className="pt-6 py-4">
          <TextField
            id="email-address-input"
            label="Email address"
            type="email"
            variant="filled"
            className="w-72"
            error={!isValidEmail}
            helperText={emailMsgError}
            onBlur={ValidateEmail}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <FormControl error={isValidPassword}>
            <FilledInput
              id="password-input"
              placeholder="Password"
              type={`${isPasswordVisible ? "text" : "password"}`}
              className="w-72"
              error={!isValidPassword}
              onBlur={ValidatePassword}
              onChange={(e) => setPassword(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                    edge="end"
                  >
                    {isPasswordVisible ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              aria-describedby="component-error-text"
            />
            <FormHelperText id="component-error-text" error>
              {passwordMsgError}
            </FormHelperText>
          </FormControl>
        </div>
        <div
          className={cx({ "pt-8": isValidPassword, "pt-2": !isValidPassword })}
        >
          <Button
            className="w-72 h-10 bg-blue-700 text-white"
            variant="contained"
            onClick={() => AccesApp()}
          >
            {`${isLogin ? "Enter" : "Register"}`}
          </Button>
        </div>
        <div>
          <div className="text-xs inline-block pt-4 pr-2">
            {`${isLogin ? "Doesn't have account ?" : "I have my account"}`}
          </div>
          <Button color="primary" onClick={() => setIsLogin(!isLogin)}>
            {`${isLogin ? "Register" : "Login"}`}
          </Button>
        </div>
      </div>
    </div>
  );
};
