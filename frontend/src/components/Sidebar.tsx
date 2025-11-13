import React, { useEffect, useState } from "react";
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
import { useUserContext } from "../context/UserContext";


interface Group {
    id: string,
    creatorUserId: string,
    groupType: string,
    name: string,
    description?: string,
    imageUrl?: string,
    createdAt: Date,
    updatedAt: Date
}

const Sidebar = () => {
  const { user, isLoading, error } = useUserContext();
  const [groups, setGroups] = useState<Group[]>([]);

  //const session = useSessionContext();
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;

  // const groupsUrl = user
  // ? `${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}/api/groups/user/${user.id}`
  // : null;
  
  useEffect(() => {
  // wait until user exists and not isLoading
  if (!user || isLoading) return;

  const groupsUrl = `${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}/api/groups/user/${user.id}`;
  
  (async () => {
    try {
      const res = await fetch(groupsUrl, { credentials: "include" });
      if (!res.ok) throw new Error(`Failed: ${res.status}`);
      const data: Group[] = await res.json();
      setGroups(data);
    } catch (err) {
      console.error("Error isLoading groups:", err);
    }
  })();
}, [user, isLoading]); // ✅ re-runs only once when user is ready

  const logoutClicked = async() => {
      await signOut();
      navigate("/auth");
  }

  if (isLoading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;
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
          {/* Dashboard */}
          <MenuItem
            key="dashboard"
            icon={<DashboardIcon />}
            active={pathname.startsWith("/dashboard")}
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </MenuItem>
          {/* Writing Groups */}
            <SubMenu
              key="submenu"
              title="Writing Groups"
              icon={<GroupIcon />}
              defaultOpen={pathname.startsWith("/component")}
            >
            {groups.length === 0 ? (
              <Typography variant="body1" color="text.primary">
                Join a Group
              </Typography>
            ) : (
                  <div>
                  {groups.map((g) => (
                    <MenuItem
                      key={g.id}
                      active={pathname === `/groups/${g.id}`}
                      onClick={() => navigate(`/groups/${g.id}`)}
                    >
                      {g.name}
                    </MenuItem>
                  ))}
                  </div>
            )}
            

            <img className="separator-line" src="/assets/images/separator-line.svg" alt="separator" />
            <MenuItem
              key="creategroup"
              active={pathname === "/creategroup"}
              onClick={() => navigate("/creategroup")}
            >
              Start a Group
            </MenuItem>
            <MenuItem
              key="managegroup"
              active={pathname === "/managegroup"}
              onClick={() => navigate("/managegroup")}
            >
              Manage a Group
            </MenuItem>
          </SubMenu>
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
          <div className="line-with-text">
            <span>Your Stuff</span>
          </div>
          {/* <img className="separator-line" src="/assets/images/separator-line.svg" alt="separator" /> */}
          <MenuItem
            key="userprofile"
            icon={<AccountBoxIcon />}
            active={pathname.startsWith("/userprofile")}
            onClick={() => navigate("/userprofile")}
          >  
            Profile
          </MenuItem>
          <SubMenu
              key="documents"
              title="Documents"
              icon={<GroupIcon />}
              defaultOpen={pathname.startsWith("/component")}
            >
            <MenuItem
              key="manuscripts"
              active={pathname === "/filemanager"}
              onClick={() => navigate("/filemanager")}
            >
              Manuscripts
            </MenuItem>
            <MenuItem
              key="feedback"
              active={pathname === "/filemanager"}
              onClick={() => navigate("/filemanager")}
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
