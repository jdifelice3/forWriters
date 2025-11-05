import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import * as ReactRouter from "react-router-dom";

import { useSessionContext } from "supertokens-auth-react/recipe/session";
import SuperTokens, { SuperTokensWrapper } from "supertokens-auth-react";
import { getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react/ui";
import { SessionAuth } from "supertokens-auth-react/recipe/session";

import { ThemeProvider, createTheme } from "@mui/material";

import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
//import LoginSuccess from "./pages/LoginSuccess";

import Sidebar from "./components/Sidebar";

import { PreBuiltUIList, SuperTokensConfig, ComponentWrapper } from "./config";
import "react-pro-sidebar/dist/css/styles.css";
import "./assets/css/forWriters.css";

SuperTokens.init(SuperTokensConfig);

function Layout() {
  const session = useSessionContext();
  console.log("session.doesSessionExist", session.doesSessionExist);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      {/* Header */}
      <header
        style={{
          backgroundColor: "#fff",
          borderBottom: "1px solid #ddd",
          padding: "0.5rem 1rem",
          display: "flex",
          alignItems: "center",
        }}
      >
        <nav
          className="header-container"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <Link
            to="/"
            style={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
            }}
          >
            <img
              src="/forWriters-logo-black.png"
              alt="forWriters"
              style={{ width: 75, display: "block" }}
            />
            <span
              style={{
                fontFamily: "Thebarstaindemo",
                fontSize: "2.5rem",
                fontWeight: 600,
                color: "#333",
                marginLeft: "0.5rem",
              }}
            >
              forWriters
            </span>
            <span style={{ color: "black" }}>
              &nbsp;&nbsp;&nbsp;where writers hone their craft
            </span>
          </Link>
        </nav>
      </header>

      {/* Two-column area below header */}
      <div style={{ display: "flex", flex: 1, minHeight: 0 }}>
        {session.doesSessionExist && <Sidebar />}

        <main
          style={{
            flex: 1,
            padding: "1rem",
            overflowY: "auto",
            backgroundColor: "#fafafa",
          }}
        >
          <ComponentWrapper>
            <Routes>
              {getSuperTokensRoutesForReactRouterDom(ReactRouter, PreBuiltUIList)}

              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              {/* <Route path="/loginSuccess" element={<LoginSuccess />} /> */}
              <Route
                path="/writersgroup"
                element={<div><h1>Bucks County Writers Group</h1></div>}
              />
              <Route path="/searchgroups" element={<div><h1>Search Groups</h1></div>} />
              <Route path="/managegroup" element={<div>Manage a Group</div>} />
              <Route path="/readers" element={<div>Readers</div>} />
              <Route path="/writers" element={<div>Writers</div>} />
              <Route path="/profile" element={<div><h1>Profile</h1></div>} />
              <Route path="/signout" element={<div><h1>Sign Out</h1></div>} />
              <Route path="/works" element={<div><h1>Your Work</h1></div>} />
            </Routes>
          </ComponentWrapper>

          {/* Show landing page content when not logged in */}
          {/* {!session.doesSessionExist && (
            <div style={{ textAlign: "center", marginTop: "2rem" }}>
              <h2>Welcome to forWriters</h2>
              <Link to="/auth" className="dashboard-button">
                Sign-up / Login
              </Link>
            </div>
          )} */}
        </main>
      </div>
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
          <SessionAuth requireAuth={false}>
            <Layout/>
          </SessionAuth>
        </BrowserRouter>
      </SuperTokensWrapper>
    </ThemeProvider>
  );
}
