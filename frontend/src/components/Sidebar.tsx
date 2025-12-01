import React, { useEffect, useState } from "react";
import { mutate } from "swr";
import { GroupGetBasic, Reading } from "../../../backend/src/domain-types";
import { useUserContext } from "../context/UserContext";
import { useLocation, useNavigate } from "react-router-dom";
import { useTheme, GlobalStyles } from "@mui/material";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { useSessionContext, signOut } from "supertokens-auth-react/recipe/session";

import {
  Typography,
  CircularProgress,
} from "@mui/material";
import MenuBookIcon from '@mui/icons-material/MenuBook';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import GroupIcon from '@mui/icons-material/Group';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LogoutIcon from '@mui/icons-material/Logout';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import KeyIcon from '@mui/icons-material/Key';
import GradientDivider from "./GradientDivider";
import RateReviewIcon from '@mui/icons-material/RateReview';

const Sidebar = () => {
  
  const { user, isLoading, error } = useUserContext();
  const [groups, setGroups] = useState<GroupGetBasic[]>([]);
  const [reading, setReading] = useState<Reading[]>([]);
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;
  
  useEffect(() => {
    if (!user || isLoading) return;
    
    const groupsUrl = `${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}/api/groups/user/${user.id}`;
    
    (async () => {
      try {
        const res = await fetch(groupsUrl, { credentials: "include" });
        if (!res.ok) throw new Error(`Failed: ${res.status}`);
        const data: GroupGetBasic[] = await res.json();
        setGroups(data);
        //setReading(data.)
      } catch (err) {
        console.error("Error isLoading groups:", err);
      }
    })();
}, [user, isLoading]); // ✅ re-runs only once when user is ready

  const logoutClicked = async() => {
      await signOut();
      mutate(() => true, undefined, { revalidate: false }); // Clear SWR cache
      navigate("/auth");
  }

  if (isLoading) return <CircularProgress />;
  if (error) return <Typography color="error">{error.message}</Typography>;
  if (!user) return <Typography>No user found.</Typography>;

  return (
    <>
      {/* Global overrides so text is readable and active items use MUI colors */}
      <GlobalStyles
        styles={{
          ".pro-sidebar": {
            backgroundColor: theme.palette.grey[900],
          },
          ".pro-sidebar .pro-menu-item": {
            color: `${theme.palette.common.white} !important`,
          },
          ".pro-sidebar .pro-inner-item:hover": {
            backgroundColor: theme.palette.action.hover,
          },
          ".pro-sidebar .pro-menu-item.active > .pro-inner-item": {
            color: `${theme.palette.primary.main} !important`,
            backgroundColor: theme.palette.action.selected,
          },
        }}
      />

      <ProSidebar>
        <Menu iconShape="square">
          <MenuItem
            key="dashboard"
            icon={<DashboardIcon />}
            active={pathname.startsWith("/dashboard")}
            onClick={() => navigate("/dashboard")}
          >
            Home
          </MenuItem>
                  
          <GradientDivider text="Groups"/>

          <MenuItem
            key="joingroup"
            icon={<CheckBoxIcon/>}
            active={pathname === "/groupsearch"}
            onClick={() => navigate("/groupsearch")}
          >
            Join a Group
          </MenuItem>

          <MenuItem
            key="creategroup"
            icon={<KeyIcon/>}
            active={pathname === "/creategroup"}
            onClick={() => navigate("/creategroup")}
          >
            Start a Group
          </MenuItem>

          <GradientDivider text="Find Collaborators"/>

          <MenuItem
            key="writers"
            icon={<KeyboardIcon />}
            active={pathname.startsWith("/writers")}
            onClick={() => navigate("/writers")}
          >
            Writers
          </MenuItem>
        
          <MenuItem
            key="readers"
            icon={<MenuBookIcon />}
            active={pathname.startsWith("/readers")}
            onClick={() => navigate("/readers")}
          >
            Readers
          </MenuItem>

          <GradientDivider text="My Stuff"/>

          <MenuItem
            key="userprofile"
            icon={<AccountBoxIcon />}
            active={pathname.startsWith("/userprofile")}
            onClick={() => navigate("/userprofile")}
          >  
            Profile
          </MenuItem>

          {/* YOUR GROUPS */}
          <SubMenu
            key="submenu"
            title="Groups"
            icon={<GroupIcon />}
            defaultOpen={pathname.startsWith("/component")}
          >
            <div>
            {groups && groups.length >0 ? groups.map((g) => (
              <MenuItem
                key={g.id}
                active={pathname === `/groups/${g.id}`}
                onClick={() => navigate(`/groups/${g.id}`)}
              >
                {g.name}
              </MenuItem>
            )) : (
              <MenuItem
                // active={pathname === `/groupsearch`}
                // onClick={() => navigate(`/groupsearch`)}
              >
                No Groups
              </MenuItem>
            )}
            </div>
          </SubMenu>
          <MenuItem
            key="readings"
            icon={<MenuBookIcon />}
            active={pathname.startsWith("/readings")}
            onClick={() => navigate("/readings")}
          >
            Readings
          </MenuItem>          
          <SubMenu
              key="documents"
              title="Documents"
              icon={<CollectionsBookmarkIcon />}
              defaultOpen={pathname.startsWith("/component")}
            >
            <MenuItem
              key="manuscripts"
              active={pathname === "/filemanager/manuscript"}
              onClick={() => navigate("/filemanager/manuscript")}
            >
              Manuscripts
            </MenuItem>
            <MenuItem
              key="feedback"
              active={pathname === "/filemanager/feedback"}
              onClick={() => navigate("/filemanager/feedback")}
            >
              Feedback
            </MenuItem>
          </SubMenu>
          
          <img className="separator-line" src="/assets/images/separator-line.svg" alt="separator" />

          <MenuItem
            key="logout"
            icon={<LogoutIcon />}
            active={pathname.startsWith("/signout")}
            onClick={() => logoutClicked()}
          >  
            Sign Out
          </MenuItem>
        </Menu>
      </ProSidebar>
    </>
  );
}

export default Sidebar;
