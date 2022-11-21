import { Backdrop, Box, LinearProgress } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { alertContext } from "../../context/ColorModeContext";

function Loader(props) {
  const { showLoader } = useContext(alertContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //console.log(showLoader);
    if (showLoader) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [showLoader]);

  return (
    <Backdrop
      sx={{ color: "#000", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={loading}
      invisible
    >
      <Box sx={{ width: "100%", position: "absolute", top: 0 }}>
        <LinearProgress color="primary" />
      </Box>
    </Backdrop>
  );
}

export default Loader;
