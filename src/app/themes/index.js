"use client";
import { createTheme } from "@mui/material";
import shadows from "@mui/material/styles/shadows";

// Color set
export const colors = {
  midnightBlue: "#091623",
  sky: "#51b4ec",
  cloudBlue: "#e1e7ea",
  white: "#ffffff",
  darkNavy: "#000a14",
  navy: "#004f96",
  redVelet: "#f04461",
  greenLight: "#19de2d",
  yellow: "#ffee52",
  grayTuna: "#454c54",
  blackBean: "#172219",
  aluminium: "#858e95",
  blackPearl: "#051724",
  tangaroa: "#1a2a38",
  midnight: "#242f39",
  backgroundShade1: "#000A15",
  backgroundShade2:
    "linear-gradient(125.86deg, rgba(255, 255, 255, 0.3) -267.85%, rgba(255, 255, 255, 0) 138.29%)",
  backgroundShade3: "#222D37",
  backgroundShade4:
    "linear-gradient(125.86deg, rgba(255, 255, 255, 0.3) -267.85%, rgba(255, 255, 255, 0) 138.29%)",
};

export const lightTheme = createTheme({
  background: {
    main: "#454c54",
    dark: "#454c54",
    light: "#454c54",
  },
  font: {
    contrast: "#000a14",
    success: "#19de2d",
    warning: "#ff9800",
    error: "#f04461",
    white: "#ffffff",
    blue: "#51b4ec",
    black: "#000a14",
    gray: "#858e95",
    green: "#19de2d",
    yellow: "#ff9800",
    red: "#f04461",
  },
  icon: {
    contrast: "#000a14",
    white: "#ffffff",
    blue: "#51b4ec",
    gray: "#858e95",
    green: "#19de2d",
    yellow: "#ff9800",
    red: "#f04461",
  },
  datagrid: {
    background: "#000a14",
    header: "#000a14",
    border: "#000a14",
    hover: "#242f39",
    row: "#242f39",
    cell: "#242f39",
  },

  palette: {
    mode: "light",
    primary: {
      // dark: colors.darkNavy,
      main: "#D2E9E9",
      // light: colors.midnight,
    },
    secondary: {
      main: "#89D091",
    },
    error: {
      main: "#f04461",
    },
    warning: {
      main: "#ff9800",
    },
    info: {
      main: "#242f39",
      light: "#ffffff",
    },
    success: {
      main: "#4caf50",
    },
    background: {
      default: "#E3F4F4",
      paper: "#D2E9E9",
    },
  },
  typography: {
    fontFamily: "Roboto",
    color: "#ffffff",
  },
  components: {
    // Name of the component
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          color: "white",
          // borderRadius: 30,
          padding: "20px",
          fontSize: "1rem",
          // backgroundColor: "red",
          borderRadius: 15,
          backgroundColor:
            "background: #53a053;background: radial-gradient(circle farthest-side at bottom center, #53a053 40%, #14744b 120%);background: -webkit-radial-gradient(circle farthest-side at bottom center, #53a053 40%, #14744b 120%);background: -moz-radial-gradient(circle farthest-side at bottom center, #53a053 40%, #14744b 120%);",
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  background: {
    main: "#091724",
    dark: "#000a14",
    light: "#242f39",
    gray: "#858e95",
  },
  font: {
    contrast: "#ffffff",
    success: "#19de2d",
    warning: "#ffee52",
    error: "#f04461",
    white: "#ffffff",
    blue: "#51b4ec",
    gray: "#858e95",
    green: "#19de2d",
    yellow: "#ffee52",
    red: "#f04461",
    black: "#000000",
  },
  icon: {
    contrast: "#ffffff",
    white: "#ffffff",
    blue: "#51b4ec",
    gray: "#858e95",
    green: "#19de2d",
    yellow: "#ffee52",
    red: "#f04461",
  },
  datagrid: {
    background: "#000a14",
    header: "#000a14",
    border: "#000a14",
    hover: "#242f39",
    row: "#242f39",
    cell: "#242f39",
  },
  button: {
    hover: "#858e95",
    default: "#51b4ec",
    success: "#19de2d",
    warning: "#ffee52",
    error: "#f04461",
    gray: "#858e95",
    white: "#ffffff",
    black: "#000a14",
  },
  select: {
    default: "#242f39",
    selected: "#091623",
    hover: "#858e95",
  },
  palette: {
    mode: "dark",
    primary: {
      // dark: colors.darkNavy,
      main: "#51b4ec",
      // light: colors.midnight,
    },
    secondary: {
      main: "#242f39",
    },
    error: {
      main: "#f04461",
    },
    warning: {
      main: "#ff9800",
    },
    info: {
      main: "#242f39",
      light: "#ffffff",
    },
    success: {
      main: "#4caf50",
    },
    background: {
      default: "#000a14",
      paper: "#000a14",
    },
  },
  typography: {
    fontFamily: "Roboto",
    color: "#ffffff",
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 15,
        },
      },
    },
  },
  components: {
    // Name of the component
    // MuiButton: {
    //   styleOverrides: {
    //     // Name of the slot
    //     root: {
    //       // Some CSS
    //       borderRadius: 15,
    //     },
    //   },
    // },
    // Mui
  },
});
