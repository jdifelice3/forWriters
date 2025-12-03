import * as ReactRouter from "react-router-dom";
import { Routes, Route, Link } from "react-router-dom";
import { useSessionContext } from "supertokens-auth-react/recipe/session";
import { getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react/ui";
import { PreBuiltUIList, ComponentWrapper } from "../config";
import Home from "../pages/Home";
import UserProfile from "../pages/UserProfile";
import FileManager from "../pages/FileManager";
import Sidebar from "../components/Sidebar";
import Groups from "../pages/Groups";
import GroupsCreate from "../pages/GroupsCreate";
import ReadingSignup from "../pages/ReadingSignup";
import ReadingFeedback from "../pages/ReadingFeedback";
import GroupJoinRequestAdmin from "../pages/GroupJoinRequestAdmin";
import GroupSearch from "../pages/GroupSearchPage";
import MemberSearchPage from "../pages/MemberSearchPage";
import Readings from "../pages/Readings";
import CollaboratorRequestAdmin from "../pages/CollaboratorRequestAdmin";
import { getDocumentTypeFromString } from "../util/Enum";

const Layout = () => {
  const session = useSessionContext();
  const drawerWidth = 280;
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      {/* Header */}
      <header
        style={{
          marginLeft: drawerWidth,
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
              marginLeft: "-30px"
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
            marginLeft: session.doesSessionExist ? 0 : 0, 
          }}
        >
          <ComponentWrapper>
            <Routes>
              {getSuperTokensRoutesForReactRouterDom(ReactRouter, PreBuiltUIList)}

              <Route path="/" element={<Home />} />
              {/* <Route path="/dashboard" element={<Dashboard />} /> */}
              <Route path="/searchgroups" element={<div><h1>Search Groups</h1></div>} />
              <Route path="/groups/:groupId" element={ <Groups /> } />
              <Route path="/creategroup" element={ <GroupsCreate /> } />
              <Route path="/membersearch" element={<MemberSearchPage />} />
              <Route path="/signout" element={<div><h1>Sign Out</h1></div>} />
              <Route path="/works" element={<div><h1>Your Work</h1></div>} />
              <Route path="/userprofile" element={<UserProfile />} />
              <Route path="/filemanager/manuscript" element={<FileManager documentType={getDocumentTypeFromString("MANUSCRIPT")} />} />
              <Route path="/filemanager/feedback" element={<FileManager documentType={getDocumentTypeFromString("FEEDBACK")} />} />
              <Route path="/joingroup" element={<div><h1>Join a Group</h1></div>} />
              <Route path="/readingsignup/:groupId" element={<ReadingSignup />} />
              <Route path="/readingfeedback/:readingId" element={<ReadingFeedback />} />
              <Route path="/joinadminpage" element={<GroupJoinRequestAdmin />} />
              <Route path="/groupsearch" element={<GroupSearch />} /> 
              <Route path="/groupjoinadmin" element={<GroupJoinRequestAdmin/>}/>
              <Route path="/readings" element={<Readings />} />
              <Route path="/connectrequests" element={<CollaboratorRequestAdmin />} />
            </Routes>
          </ComponentWrapper>
        </main>
      </div>
    </div>
  );
}

export default Layout;