import { useNavigate, useLocation } from "react-router-dom";
import { useGroupContext } from "../context/GroupContextProvider";
import { NAV_ITEMS } from "../config/SidebarConfig";
import {
    createTheme,
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    ThemeProvider, 
} from "@mui/material";
import { Group } from "../types/domain-types";
import DashboardIcon from "@mui/icons-material/Dashboard";
import KeyboardIcon from "@mui/icons-material/Keyboard";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import GroupIcon from "@mui/icons-material/Group";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';


const Sidebar = () => {
    const { activeGroup } = useGroupContext();
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const drawerWidth = 175;

    const groupId = activeGroup ? activeGroup.id : "1";
   
    const theme = createTheme({
        typography: {
            fontSize: 12,
        },
    });

  return (
    <ThemeProvider theme={theme}>
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          background: theme.palette.grey[900],
          color: theme.palette.common.white,
          borderRight: `1px solid ${theme.palette.grey[800]}`,
        },
      }}
    >
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <List>
      {/* {NAV_ITEMS.filter(item =>
        !item.roles || item.roles.includes(activeGroup ? activeGroup?.role : "MEMBER")
      ).map(item => ( */}
        <ListItemButton
                key={"/dashboard"}
                selected={pathname.startsWith("/dashboard")}
                onClick={() => navigate("/dashboard")}
            >
            <ListItemIcon className="sidebarIcon" color="white">{<DashboardIcon htmlColor="white"/>}</ListItemIcon>
            <ListItemText primary={"Dashboard"} />
        </ListItemButton>

        <ListItemButton
                key={"/groups"}
                selected={pathname.startsWith("/groups")}
                onClick={() => navigate(`/groups/${groupId}`)}
                disabled={!activeGroup}
            >
            <ListItemIcon className="sidebarIcon" color="white">{<GroupIcon htmlColor="white"/>}</ListItemIcon>
            <ListItemText primary={"Group"} />
        </ListItemButton>

        <ListItemButton
                key={"/readings"}
                selected={pathname.startsWith("/readings")}
                onClick={() => navigate(`/groups/${groupId}/readings`)}
                disabled={!activeGroup}
            >
            <ListItemIcon className="sidebarIcon" color="white">{<MenuBookIcon htmlColor="white"/>}</ListItemIcon>
            <ListItemText primary={"Readings"} />
        </ListItemButton>

        <ListItemButton
                key={"/files"}
                selected={pathname.startsWith("/files")}
                onClick={() => navigate("/files")}
            >
            <ListItemIcon className="sidebarIcon" color="white">{<CollectionsBookmarkIcon htmlColor="white"/>}</ListItemIcon>
            <ListItemText primary={"Files"} />
        </ListItemButton>

        <ListItemButton
                key={"/members"}
                selected={pathname.startsWith("/members")}
                onClick={() => navigate("/members")}
                disabled={true}
            >
            <ListItemIcon className="sidebarIcon" color="white">{<ConnectWithoutContactIcon htmlColor="white"/>}</ListItemIcon>
            <ListItemText primary={"Members"} />
        </ListItemButton>
    </List>
    </Drawer>
    </ThemeProvider>
  );
};
export default Sidebar;
