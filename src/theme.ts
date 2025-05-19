"use client";
import { createTheme } from "@mui/material/styles";
import { blue, lightGreen, pink, purple } from "@mui/material/colors";

const theme = createTheme({
  cssVariables: { colorSchemeSelector: "class" },
  colorSchemes: {
    light: {
      palette: {
        primary: { main: lightGreen[400] },
        secondary: { main: purple[700] },
        info: { main: blue[600] },
      },
    },
    dark: {
      palette: {
        primary: { main: lightGreen[300] },
        secondary: { main: pink.A100 },
        info: { main: blue[300] },
      },
    },
  },
  typography: {
    fontFamily: "var(--font-roboto)",
  },
});

export default theme;
