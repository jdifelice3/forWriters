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
import ReadingSignup from "../pages/ReadingSignup";
import ReadingFeedback from "../pages/ReadingFeedback";
import GroupJoinRequestAdmin from "../pages/GroupJoinRequestAdmin";
import GroupSearch from "../pages/GroupSearchPage";
import MemberSearchPage from "../pages/MemberSearchPage";
import Readings from "../pages/Readings";
import CollaboratorRequestAdmin from "../pages/CollaboratorRequestAdmin";
import { DocType } from "../util/Enum";
import Dashboard from "../pages/Dashboard";
import GroupsPersonal from "../pages/GroupsPersonal";
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
                <Route path="/" element={<Home />} />
                <Route path="/userprofile" element={<UserProfile />} />

                <Route path="/filemanager/manuscript" element={<FileManager documentType={DocType.MANUSCRIPT} />} />
                <Route path="/filemanager/feedback" element={<FileManager documentType={DocType.FEEDBACK} />} />

                <Route path="/groups/details" element={<Groups />} />
                <Route path="/groups/details/personal" element={<GroupsPersonal />} />
                <Route path="/creategroup" element={<GroupsCreate />} />
                <Route path="/readingsignup/:groupId" element={<ReadingSignup />} />
                <Route path="/readingfeedback/:readingId" element={<ReadingFeedback />} />
                <Route path="/joinadminpage" element={<GroupJoinRequestAdmin />} />

                <Route path="/membersearch" element={<MemberSearchPage />} />
                <Route path="/groupsearch" element={<GroupSearch />} />
                <Route path="/readings" element={<Readings />} />
                <Route path="/connectrequests" element={<CollaboratorRequestAdmin />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </Box>
    </Box>
  );
}
