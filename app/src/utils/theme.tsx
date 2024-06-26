"use client";
import { createTheme, PaletteColorOptions } from "@mui/material/styles";
import "@fontsource/Kanit/300.css";
import "@fontsource/Kanit/400.css";
import "@fontsource/Kanit/500.css";
import "@fontsource/Kanit/700.css";

declare module "@mui/material/styles" {
  interface Palette {
    textblack: PaletteColorOptions;
    whitebg: PaletteColorOptions;
  }

  interface PaletteOptions {
    textblack?: PaletteColorOptions;
    whitebg?: PaletteColorOptions;
  }
}

const breakpoints = {
  values: {
    xs: 0,
    sm: 600, // Phone
    md: 900, // Tablet/Laptop
    lg: 1200, // Desktop
    xl: 1536,
  },
};

let theme = createTheme({
  palette: {
    primary: {
      main: "#134B8A",
      dark: "#OF1E56",
      light: "#C4D3E9",
      contrastText: "#fff",
    },

    textblack: {
      main: "rgba(0,0,0,0.9)",
    },
    whitebg: {
      main: "#F5F6F8",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.variant === "contained" &&
            ownerState.disabled && {
              backgroundColor: "#C3BEBB",
              color: "#fff",
            }),
        }),
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            backgroundColor: "#134B8A",
            color: "white",
            borderRadius: "25px",
          },
        },
      },
    },
  },

  typography: {
    fontFamily: "'Kanit', 'Roboto'",
    h1: {
      fontSize: "60px",
    },
    h2: {
      fontSize: "48px",
    },
    h3: {
      fontSize: "36px",
    },
    h4: {
      fontSize: "24px",
    },
    h5: {
      fontSize: "20px",
    },
    h6: {
      fontSize: "18px",
      [`@media screen and (max-width: ${breakpoints.values.md}px)`]: {
        fontSize: "12px",
      },
    },
    body1: { fontSize: "16px" },
    body2: {
      fontSize: "14px",
      [`@media screen and (max-width: ${breakpoints.values.md}px)`]: {
        fontSize: "10px",
      },
    },
  },
});

export default theme;
