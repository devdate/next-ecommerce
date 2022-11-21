import { LoadingButton } from "@mui/lab";
import {
  Alert,
  Box,
  Card,
  Snackbar,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import InfoIcon from "@mui/icons-material/Info";
import Link from "next/link";
import { styled } from "@mui/material/styles";
import { Colors } from "../src/theme";
import { useRouter } from "next/router";
import axios from "axios";
import { parseCookies } from "nookies";
import { alertContext } from "../src/context/ColorModeContext";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [validEmail, setValidEmail] = useState(true);
  const [emailTouched, setEmailTouched] = useState(false);
  const [password, setPassword] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loginStatus, setloginStatus] = useState(false);
  const { OpenAlert, alertData } = useContext(alertContext);

  const router = useRouter();

  const validateEmail = (email) => {
    setUserEmail(email);
    const e = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
    setValidEmail(e);
  };
  const validatePass = (pass) => {};

  const submitHandler = async (e) => {
    e.preventDefault();
    setEmailTouched(true);
    setLoading(true);
    setIsSubmitted(true);
    //console.log("clicked");
    if (
      !username ||
      !password ||
      !userEmail ||
      !validEmail ||
      password.length < 8 ||
      password.length > 20
    ) {
      setLoading(false);
      alertData.type = "error";
      alertData.msg = "Please check all fields";
      alertData.time = 2000;
      OpenAlert();
      return;
    }
    try {
      const res = await axios.post(`${process.env.PUBLIC_URL}/api/signup`, {
        name: username,
        email: userEmail,
        password,
      });
      alertData.type = "success";
      alertData.msg = "User successfully created !";
      alertData.time = 3000;
      OpenAlert();
      setLoading(false);
      router.push("/login");
    } catch (err) {
      setLoading(false);
      alertData.type = "error";
      alertData.msg = err.response.data.error;
      alertData.time = 3000;
      OpenAlert();
      console.log(err);
    }
  };

  return (
    <Box
      justifyContent="center"
      alignItems="center"
      textAlign="center"
      display="flex"
      flexDirection="column"
      marginTop={4}
      padding={2}
    >
      <Typography variant="h4" fontWeight={500}>
        Sign Up
      </Typography>
      <Card sx={{ maxWidth: "400px", width: "100%", padding: 4, marginTop: 4 }}>
        <TextField
          id="userName"
          label="Name"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          error={isSubmitted && username === ""}
          helperText={
            isSubmitted && username === "" ? "This field is required" : ""
          }
        />
        <TextField
          id="userEmail"
          label="Email"
          fullWidth
          value={userEmail}
          onChange={(e) => validateEmail(e.target.value)}
          onBlur={() => setEmailTouched(true)}
          error={emailTouched && (userEmail === "" || !validEmail)}
          helperText={
            emailTouched
              ? userEmail === ""
                ? "This field is required"
                : validEmail
                ? ""
                : "Enter a valid Email"
              : ""
          }
          sx={{ marginTop: 2 }}
        />
        <TextField
          id="password"
          label="Password"
          fullWidth
          value={password}
          type="password"
          autoComplete="current-password"
          onChange={(e) => setPassword(e.target.value)}
          inputProps={{ minLength: 8, maxLength: 20 }}
          InputProps={{
            endAdornment: (
              <Tooltip
                title="Password must be 8-20 characters in length"
                placement="top"
              >
                <InfoIcon color="primary" sx={{ cursor: "pointer" }} />
              </Tooltip>
            ),
          }}
          error={
            isSubmitted &&
            (password === "" || password.length < 8 || password.length > 20)
          }
          helperText={
            isSubmitted
              ? password === ""
                ? "This field is required"
                : password.length < 8 || password.length > 20
                ? "Password must be 8-20 characters in length"
                : ""
              : ""
          }
          sx={{ marginTop: 2 }}
        />
        <Box marginTop={4} flex={1} textAlign="center">
          <LoadingButton
            variant="contained"
            type="submit"
            onClick={submitHandler}
            loading={loading}
            endIcon={<SendIcon />}
          >
            Sign Up
          </LoadingButton>
        </Box>
        <Typography fontSize={16} fontWeight={600} marginTop={2}>
          Already a User?{" "}
          <Link href="/login" style={{ color: Colors.primary }}>
            Login
          </Link>
        </Typography>
      </Card>
    </Box>
  );
};

export async function getServerSideProps(ctx) {
  const cookie = parseCookies(ctx);
  const token = cookie.token ? JSON.token : "";
  if (token) {
    const { res } = ctx;
    res.writeHead(302, { Location: "/account" });
    res.end();
  }
  return {
    props: {},
  };
}

export default SignUp;
