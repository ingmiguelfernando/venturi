import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import { useUser } from "../../hooks/useUser";
import { ErrorMessage } from "../ErrorMessage";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {"Copyright © "}
      <Link color="inherit" href="https://venturicbt.com/">
        Venturi
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

interface FormInputs {
  email: string;
  password: string;
}

export default function SignIn() {
  const { user, signIn, createUser, signOut } = useUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();
  const [isLogin, setIsLogin] = useState(true);


  const onSubmit = (data: FormInputs) => {
    if (isLogin) {
      signIn(data.email, data.password);
    } else {
      createUser(data.email, data.password);
    };
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        borderRadius: "45px 0px 0px 45px",
        height: "100vh",
      }}
      bgcolor="background.paper"
    >
      {user ? (<Typography variant="h6" component="span">{`Welcome back:${user.email}`}</Typography>) : (
        <>
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {`${isLogin ? "Login" : "Sign Up"} `}
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ mt: 1, marginX: "20px" }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              autoComplete="email"
              autoFocus
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Email is invalid",
                },
              })}
            />
            <ErrorMessage errors={errors} name="email" />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              {...register("password", { required: "Password is required" })}
            />
            <ErrorMessage errors={errors} name="password" />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              {`${isLogin ? "Enter" : "Register"}`}
            </Button>
            <Grid container>
              <Grid item xs>
                {isLogin && <Link href="#" variant="body2">
                  Forgot password?
                </Link>}
              </Grid>
              <Grid item>
                <Link href="#" variant="body2" onClick={() => setIsLogin(!isLogin)}>
                  {`${isLogin ? "Doesn't have account ?" : "I have my account"}`}
                </Link>
              </Grid>
            </Grid>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </>)}
    </Box>
  );
}
