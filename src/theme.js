import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";
import { useContext, useMemo } from "react";
import ColorModeContext from "./context/ColorModeContext";

export const Colors = {
  primary: "#00646d",
  secondary: "#00aaba",
  success: "#4CAF50",
  info: "#00a2ff",
  danger: "#d13241",
  warning: "#FFC107",
  dark: "#0e1b20",
  light: "#aaa",
  muted: "#abafb3",
  border: "#DDDFE1",
  inverse: "#2F3D4A",
  shaft: "#333",
  ///////////////
  // Grays
  ///////////////
  dim_grey: "#696969",
  dove_gray: "#d5d5d5",
  body_bg: "#f3f6f9",
  light_gray: "rgb(230,230,230)",
  ///////////////
  // Solid Color
  ///////////////
  white: "#fff",
  black: "#000",

  darkPrimary: "#202124",
};
//console.log(ColorModeContext);
//const ctx = useContext(ColorModeContext);
//console.log(ColorModeContext);

export const darkTheme = createTheme({
  palette: {
    primary: {
      main: Colors.primary,
    },
    secondary: {
      main: Colors.white,
    },
    error: {
      main: Colors.danger,
    },
    mode: "dark",
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
      xxl: 1920,
      xxxl: 2560,
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableRipple: true,
        disableElevation: true,
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          transition: "all 0.3s linear",
        },
      },
    },
    MuiUseMediaQuery: {
      defaultProps: {
        noSsr: true,
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "20px",
          "& .hidden-button": {
            opacity: 0,
          },
          "&:hover .hidden-button": {
            opacity: 1,
            transition: "all 0.2s linear",
          },
        },
      },
    },
  },
});

// Create a theme instance.
export const lightTheme = createTheme({
  palette: {
    primary: {
      main: Colors.primary,
    },
    secondary: {
      main: Colors.primary,
    },
    error: {
      main: Colors.danger,
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
      xxl: 1920,
      xxxl: 2560,
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableRipple: true,
        disableElevation: true,
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          transition: "all 0.3s linear",
        },
      },
    },
    MuiUseMediaQuery: {
      defaultProps: {
        noSsr: true,
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "20px",
          "& .hidden-button": {
            opacity: 0,
          },
          "&:hover .hidden-button": {
            opacity: 1,
            transition: "all 0.2s linear",
          },
        },
      },
    },
  },
});

export default lightTheme;
