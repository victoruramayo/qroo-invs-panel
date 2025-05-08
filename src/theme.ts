"use client";
import { createTheme } from "@mui/material/styles";
import { lightGreen, pink } from "@mui/material/colors";

const theme = createTheme({
  cssVariables: { colorSchemeSelector: "class" },
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: lightGreen[300],
        },
        secondary: { main: pink.A100 },
      },
    },
    dark: {
      palette: {
        primary: {
          main: lightGreen[300],
        },
        secondary: { main: pink.A100 },
      },
    },
  },
  typography: {
    fontFamily: "var(--font-roboto)",
  },
});

export default theme;
