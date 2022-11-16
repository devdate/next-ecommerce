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
import { styled } from "@mui/material/styles";
import { Colors } from "../src/theme";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setErrorOpen(false);
  };

  const loginHandler = () => {
    setLoading(true);
    setIsSubmitted(true);
    console.log("clicked");
    if (!username || !password) {
      setLoading(false);
      setErrorMsg("Please check all fields");
      setErrorOpen(true);
      return;
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
          id="username"
          label="Email"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          error={isSubmitted && username === ""}
          helperText={
            isSubmitted && username === "" ? "This field is required" : ""
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
      <Snackbar open={errorOpen} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {errorMsg}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Login;
