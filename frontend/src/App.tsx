import SuperTokens, { SuperTokensWrapper } from "supertokens-auth-react";
import { getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react/ui";
import { SessionAuth } from "supertokens-auth-react/recipe/session";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import * as ReactRouter from "react-router-dom";

import { ThemeProvider, createTheme } from "@mui/material";

import Dashboard from "./pages/Dashboard";
import { PreBuiltUIList, SuperTokensConfig, ComponentWrapper } from "./config";
import Home from "./pages/Home";
import LoginSuccess from "./pages/LoginSuccess";

import "react-pro-sidebar/dist/css/styles.css";

import Sidebar from "./components/Sidebar";

SuperTokens.init(SuperTokensConfig);

function Layout() {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar />
      <main style={{ flex: 1, padding: "1rem", overflowY: "auto" }}>
        <ComponentWrapper>
          <Routes>
            <Route path="/" element={<Home />} />
            {getSuperTokensRoutesForReactRouterDom(ReactRouter, PreBuiltUIList)}

            <Route
              path="/dashboard"
              element={
                <SessionAuth>
                  <Dashboard />
                </SessionAuth>
              }
            />

            <Route
              path="/loginSuccess"
              element={
                <SessionAuth>
                  <LoginSuccess />
                </SessionAuth>
              }
            />

            {/* Example placeholder component routes */}
            <Route path="/component1" element={<div>Component 1 Page</div>} />
            <Route path="/component2" element={<div>Component 2 Page</div>} />
          </Routes>
        </ComponentWrapper>
      </main>
    </div>
  );
}

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
          <Layout />
        </BrowserRouter>
      </SuperTokensWrapper>
    </ThemeProvider>
  );
}
