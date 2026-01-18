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
      {NAV_ITEMS.filter(item =>
        !item.roles || item.roles.includes(activeGroup ? activeGroup?.role : "MEMBER")
      ).map(item => (
        <ListItemButton
                key={item.path}
                selected={pathname.startsWith(item.path)}
                onClick={() => navigate(item.path.includes("groups") ? item.path + "/" + groupId : item.path)}
                disabled={!activeGroup && 
                    (item.label === "Group" || 
                    item.label === "Readings" ||
                    item.label === "Members")
                    ? true : false }
            >
            <ListItemIcon className="sidebarIcon" color="white">{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
        </ListItemButton>
      ))}
    </List>
    </Drawer>
    </ThemeProvider>
  );
};
export default Sidebar;
