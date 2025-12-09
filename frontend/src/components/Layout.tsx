import { Routes, Route, Link } from "react-router-dom";
import { useSessionContext } from "supertokens-auth-react/recipe/session";

import Sidebar from "./Sidebar";

// Your pages
import Home from "../pages/Home";
import UserProfile from "../pages/UserProfile";
import FileManager from "../pages/FileManager";
import Groups from "../pages/Groups";
import GroupsCreate from "../pages/GroupsCreate";
import ReadingSignup from "../pages/ReadingSignup";
import ReadingFeedback from "../pages/ReadingFeedback";
import GroupJoinRequestAdmin from "../pages/GroupJoinRequestAdmin";
import GroupSearch from "../pages/GroupSearchPage";
import MemberSearchPage from "../pages/MemberSearchPage";
import Readings from "../pages/Readings";
import CollaboratorRequestAdmin from "../pages/CollaboratorRequestAdmin";
import { DocType } from "../util/Enum";

export default function Layout() {
  const { loading } = useSessionContext();

  if (loading) return null;

  const drawerWidth = 280;

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      
      {/* HEADER */}
      <header
        style={{
          marginLeft: drawerWidth,
          backgroundColor: "#fff",
          borderBottom: "1px solid #ddd",
          padding: "0.5rem 1rem",
          display: "Flex",
          alignItems: "center",
        }}
      >
        <Link to="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
          <img src="/forWriters-logo-black.png" alt="logo" style={{ width: 75 }} />
          <span style={{ fontSize: "2.5rem", marginLeft: ".5rem", color: "#333" }}>
            forWriters
          </span>
          <span style={{ color: "black" }}>&nbsp;&nbsp;&nbsp;where writers hone their craft</span>
        </Link>
      </header>

      {/* BODY */}
      <div style={{ display: "flex", flex: 1, minHeight: 0 }}>
        <Sidebar />

        <main style={{ flex: 1, padding: "1rem", overflowY: "auto", backgroundColor: "#fafafa" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/userprofile" element={<UserProfile />} />

            <Route path="/filemanager/manuscript" element={<FileManager documentType={DocType.MANUSCRIPT} />} />
            <Route path="/filemanager/feedback" element={<FileManager documentType={DocType.FEEDBACK} />} />

            <Route path="/groups/:groupId" element={<Groups />} />
            <Route path="/creategroup" element={<GroupsCreate />} />
            <Route path="/readingsignup/:groupId" element={<ReadingSignup />} />
            <Route path="/readingfeedback/:readingId" element={<ReadingFeedback />} />
            <Route path="/joinadminpage" element={<GroupJoinRequestAdmin />} />

            <Route path="/membersearch" element={<MemberSearchPage />} />
            <Route path="/groupsearch" element={<GroupSearch />} />
            <Route path="/readings" element={<Readings />} />
            <Route path="/connectrequests" element={<CollaboratorRequestAdmin />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
