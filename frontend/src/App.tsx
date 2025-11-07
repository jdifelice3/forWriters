import { SessionAuth } from "supertokens-auth-react/recipe/session";
import { BrowserRouter } from "react-router-dom";
import SuperTokens, { SuperTokensWrapper } from "supertokens-auth-react";
import { ThemeProvider, createTheme } from "@mui/material";
import { SuperTokensConfig } from "./config";
import Layout from "./components/Layout";
import "react-pro-sidebar/dist/css/styles.css";
import "./assets/css/forWriters.css";

SuperTokens.init(SuperTokensConfig);

// ---------- Root App ----------
export default function App() {
  const theme = createTheme({
    palette: {
      mode: "light", // switch to "dark" if you want full dark mode
      primary: { main: "#1976d2" },
      background: { default: "#f5f5f5" },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <SuperTokensWrapper>
        <BrowserRouter>
          <SessionAuth requireAuth={false}>
            <Layout/>
          </SessionAuth>
        </BrowserRouter>
      </SuperTokensWrapper>
    </ThemeProvider>
  );
}
