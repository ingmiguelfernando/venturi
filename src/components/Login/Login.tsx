import { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

export const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div className="bg-white opacity-95 h-96 rounded p-12">
      <h1 className="text-3xl opacity-100">{`${
        isLogin ? "Login" : "Sign In"
      } `}</h1>
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
