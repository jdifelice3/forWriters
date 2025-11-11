import * as ReactRouter from "react-router-dom";
import { Routes, Route, Link } from "react-router-dom";
import { useSessionContext } from "supertokens-auth-react/recipe/session";
import { getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react/ui";
import { PreBuiltUIList, ComponentWrapper } from "../config";
import Dashboard from "../pages/Dashboard";
import UserProfile from "../pages/UserProfile";
import FileManager from "../pages/FileManager";
import Sidebar from "../components/Sidebar";


const Layout = () => {
  const session = useSessionContext();

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
              <Route path="/writersgroup" element={<div><h1>Bucks County Writers Group</h1></div>}/>
              <Route path="/searchgroups" element={<div><h1>Search Groups</h1></div>} />
              <Route path="/managegroup" element={<div>Manage a Group</div>} />
              <Route path="/readers" element={<div>Readers</div>} />
              <Route path="/writers" element={<div>Writers</div>} />
              <Route path="/signout" element={<div><h1>Sign Out</h1></div>} />
              <Route path="/works" element={<div><h1>Your Work</h1></div>} />
              <Route path="/userprofile" element={<UserProfile />} />
              <Route path="/filemanager" element={<FileManager />} />
            </Routes>
          </ComponentWrapper>
        </main>
      </div>
    </div>
  );
}

export default Layout;