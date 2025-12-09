import { SessionAuth } from "supertokens-auth-react/recipe/session";
import { BrowserRouter } from "react-router-dom";
import * as ReactRouter from "react-router-dom";
import SuperTokens, { SuperTokensWrapper } from "supertokens-auth-react";
import { ThemeProvider, createTheme } from "@mui/material";
import { SuperTokensConfig } from "./config";
import Layout from "./components/Layout";
import "react-pro-sidebar/dist/css/styles.css";
import "./assets/css/forWriters.css";
import { UserProvider } from "./context/UserContext";
import { getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react/ui";
import { PreBuiltUIList } from "./config";

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
        {getSuperTokensRoutesForReactRouterDom(ReactRouter, PreBuiltUIList)}
          <SessionAuth requireAuth={false}>
            <UserProvider>
              <Layout/>
            </UserProvider>
          </SessionAuth>
        </BrowserRouter>
      </SuperTokensWrapper>
    </ThemeProvider>
  );
}
