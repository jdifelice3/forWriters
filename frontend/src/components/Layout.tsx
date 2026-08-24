import { Routes, Route, Link } from "react-router-dom";
import { useSessionContext } from "supertokens-auth-react/recipe/session";

import {
    Box,
} from "@mui/material";

import StudioSidebar from "./studio/StudioSidebar";

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
import FileFeedbackDetail from "../pages/FileFeedbackDetail";
import StudioTopNav from "./studio/StudioTopNav";
import Billing from "../pages/Billing";
import { VersionCompare } from "../pages/VersionCompare";
import { getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react/ui";
import { PreBuiltUIList } from "../supertokensConfig";
import ReadingNotification from "../pages/ReadingNotification";
import CritiqueWorkflow from "../pages/CritiqueWorkflow";
import CritiqueHub from "../pages/CritiqueHub";
import StudioHome from "../pages/StudioHome";
import * as ReactRouterDOM from "react-router-dom";
import "../assets/css/studio-shell.css";


export default function Layout() {
  const { loading } = useSessionContext();

  if (loading) return null;

  return (
    <Box sx={{ display: "flex" }} className="studio-shell">
        <StudioTopNav />
        <StudioSidebar />
        <Box component="main" sx={{ flexGrow: 1 }} className="studio-main">
            <Routes>
                 {getSuperTokensRoutesForReactRouterDom(ReactRouterDOM, PreBuiltUIList)}
                <Route path="/studio" element={<StudioHome />} />
                <Route path="/dashboard" element={<StudioHome />} />
                <Route path="/" element={<StudioHome />} />
                <Route path="/legacy-dashboard" element={<Dashboard />} />
                <Route path="/userprofile" element={<UserProfile />} />
                <Route path="/files" element={<FileManager/>} />
                <Route path="/filemanager/manuscript" element={<FileManager/>} />
                <Route path="/filemanager/feedback" element={<FileManager />} />

                <Route path="/groups/:groupId" element={<Groups />} />
                <Route path="/groupsearch" element={<GroupSearch />} />
                <Route path="/creategroup" element={<GroupsCreate />} />
                
                <Route path="/groups/:groupId/readings" element={<Readings />} />
                <Route path="/groups/:groupId/critique" element={<CritiqueHub />} />
                <Route
                  path="/groups/:groupId/readings/:readingId/workflow"
                  element={<CritiqueWorkflow />}
                />
                <Route
                  path="/groups/:groupId/readings/:readingId/review"
                  element={<FileFeedback />}
                />
                <Route path="/filefeedback/:readingId" element={<FileFeedback />} />
                <Route path="/filefeedbackdetail/:appFileId" element={<FileFeedbackDetail />} />
                <Route path="/joinadminpage" element={<GroupJoinRequestAdmin />} />

                <Route path="/members" element={<MemberSearchPage />} />
                <Route path="/connectrequests" element={<CollaboratorRequestAdmin />} />
                <Route path="/billing" element={<Billing />} />
                <Route path="/versioncompare/:appFileMetaId/" element={<VersionCompare />} />
                {/* <Route path="/groups/:groupId/readings/:readingId/notification" element={<ReadingNotification />} /> */}

            </Routes>
        </Box>
    </Box>
  );
}
