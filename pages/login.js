import { LoadingButton } from "@mui/lab";
import {
  Alert,
  Box,
  Card,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { useState, useContext, useEffect } from "react";
import SendIcon from "@mui/icons-material/Send";
import Link from "next/link";
import { Colors } from "../src/theme";
import Cookies from "js-cookie";
import { parseCookies } from "nookies";
import { useRouter } from "next/router";
import axios from "axios";
import { alertContext, UserContext } from "../src/context/ColorModeContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { setUserContext } = useContext(UserContext);
  const { OpenAlert, alertData, toggleLoading } = useContext(alertContext);

  useEffect(() => {
    toggleLoading(false);
  }, []);

  const loginHandler = async (e) => {
    e.preventDefault();
    toggleLoading(true);
    setLoading(true);
    setIsSubmitted(true);
    //console.log("clicked");
    if (!email || !password) {
      alertData.type = "error";
      alertData.msg = "Please check all fields";
      alertData.time = 2000;
      OpenAlert();
      return;
    }
    try {
      const res = await axios.post(`${process.env.PUBLIC_URL}/api/login`, {
        email,
        password,
      });
      //console.log(res);
      setUserContext(res.data.token, res.data.user);
      setLoading(false);
      alertData.type = "success";
      alertData.msg = "Loggen In";
      alertData.time = 2000;
      OpenAlert();

      router.push("/");
    } catch (err) {
      setLoading(false);
      alertData.type = "error";
      alertData.msg = err.response.data.error;
      alertData.time = 2000;
      OpenAlert();
      console.log(err.response.data.error);
      toggleLoading(false);
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
        Login
      </Typography>
      <Card sx={{ maxWidth: "400px", width: "100%", padding: 4, marginTop: 4 }}>
        <TextField
          id="email"
          label="Email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={isSubmitted && email === ""}
          helperText={
            isSubmitted && email === "" ? "This field is required" : ""
          }
        />
        <TextField
          id="password"
          label="Password"
          fullWidth
          value={password}
          type="password"
          autoComplete="current-password"
          onChange={(e) => setPassword(e.target.value)}
          error={isSubmitted && password === ""}
          helperText={
            isSubmitted && password === "" ? "This field is required" : ""
          }
          sx={{ marginTop: 2 }}
        />
        <Box marginTop={4} flex={1} textAlign="center">
          <LoadingButton
            variant="contained"
            type="submit"
            onClick={loginHandler}
            loading={loading}
            endIcon={<SendIcon />}
          >
            Login
          </LoadingButton>
        </Box>
        <Typography fontSize={16} fontWeight={600} marginTop={2}>
          Not a User?{" "}
          <Link
            href="/signup"
            style={{ color: Colors.primary }}
            onClick={() => toggleLoading(true)}
          >
            Sign Up
          </Link>
        </Typography>
      </Card>
    </Box>
  );
};

export async function getServerSideProps(ctx) {
  const cookie = parseCookies(ctx);
  const token = cookie.token;
  if (token) {
    const { res } = ctx;
    res.writeHead(302, { Location: "/account" });
    res.end();
  }
  return {
    props: {},
  };
}

export default Login;
