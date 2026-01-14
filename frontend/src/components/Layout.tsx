import { Routes, Route, Link } from "react-router-dom";
import { useSessionContext } from "supertokens-auth-react/recipe/session";

import {
    Box,
} from "@mui/material";

import Sidebar from "./Sidebar";

// Your pages
import Home from "../pages/Home";
import UserProfile from "../pages/UserProfile";
import FileManager from "../pages/FileManager";
import Groups from "../pages/Groups";
import GroupsCreate from "../pages/GroupsCreate";
import FileFeedback from "../pages/FileFeedback";
import GroupJoinRequestAdmin from "../pages/GroupJoinRequestAdmin";
import GroupSearch from "../pages/GroupSearch";
import MemberSearchPage from "../pages/MemberSearchPage";
import Readings from "../pages/Readings";
import CollaboratorRequestAdmin from "../pages/CollaboratorRequestAdmin";
import Dashboard from "../pages/Dashboard";
// import GroupsPersonal from "../pages/GroupsPersonal";
import TopNav from "../components/nav/TopNav";

export default function Layout() {
  const { loading } = useSessionContext();

  if (loading) return null;

  return (
    <Box sx={{ display: "flex" }}>
        <TopNav />
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, mt: 10, ml:0 }}>
            <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/" element={<Dashboard />} />
                <Route path="/userprofile" element={<UserProfile />} />
                <Route path="/files" element={<FileManager/>} />
                <Route path="/filemanager/manuscript" element={<FileManager/>} />
                <Route path="/filemanager/feedback" element={<FileManager />} />

                <Route path="/groups/:groupId" element={<Groups />} />
                {/* <Route path="/groups/personal" element={<GroupsPersonal />} /> */}
                <Route path="/groupsearch" element={<GroupSearch />} />
                <Route path="/creategroup" element={<GroupsCreate />} />
                
                <Route path="/readings" element={<Readings />} />
                <Route path="/readingfeedback/:readingId" element={<FileFeedback />} />
                <Route path="/joinadminpage" element={<GroupJoinRequestAdmin />} />

                <Route path="/membersearch" element={<MemberSearchPage />} />
                <Route path="/connectrequests" element={<CollaboratorRequestAdmin />} />
            </Routes>
        </Box>
    </Box>
  );
}
