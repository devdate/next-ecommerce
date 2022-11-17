import { LoadingButton } from "@mui/lab";
import {
  Alert,
  Box,
  Card,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import Link from "next/link";
import { Colors } from "../src/theme";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setErrorOpen(false);
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setIsSubmitted(true);
    console.log("clicked");
    if (!email || !password) {
      setLoading(false);
      setErrorMsg("Please check all fields");
      setErrorOpen(true);
      return;
    }
    try {
      const res = await axios.post(`${process.env.PUBLIC_URL}/api/login`, {
        email,
        password,
      });
      console.log(res);
      Cookies.set("token", res.data.token);
      Cookies.set("user", res.data.user);
      setLoading(false);
      router.push("/");
    } catch (err) {
      setLoading(false);
      setErrorMsg(err.response.data.error);
      setErrorOpen(true);
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
          <Link href="/signup" style={{ color: Colors.primary }}>
            Sign Up
          </Link>
        </Typography>
      </Card>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={errorOpen}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {errorMsg}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Login;
