import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import lightTheme, { darkTheme } from "../theme";

const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
  mode: "light",
});

export const ColorModeContextProvider = (props) => {
  const [mode, setMode] = React.useState("light");
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
      mode,
    }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={mode === "light" ? lightTheme : darkTheme}>
        {props.children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default ColorModeContext;
