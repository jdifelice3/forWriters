import { useEffect, useState } from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Typography,
  CircularProgress,
  Box,
  Divider,
  Badge
} from "@mui/material";

import { mutate } from "swr";
import { useUserContext } from "../context/UserContext";
import { useLocation, useNavigate } from "react-router-dom";
import { signOut } from "supertokens-auth-react/recipe/session";
import {
    ThemeProvider, 
    createTheme
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import KeyboardIcon from "@mui/icons-material/Keyboard";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import GroupIcon from "@mui/icons-material/Group";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LogoutIcon from "@mui/icons-material/Logout";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import KeyIcon from "@mui/icons-material/Key";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';

import GradientDivider from "./GradientDivider";

import { GroupBasic } from "../types/domain-types";

const drawerWidth = 250;

export default function Sidebar() {
    const theme = createTheme({
        typography: {
            fontSize: 12, // Change this value to your preferred font size
        },
    });
  //const theme = useTheme();
  const { user, isLoading, error } = useUserContext();
  const [groups, setGroups] = useState<GroupBasic[]>([]);
  const [groupsOpen, setGroupsOpen] = useState(true);
  const [docsOpen, setDocsOpen] = useState(false);

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
        const data: GroupBasic[] = await res.json();
        setGroups(data);
      } catch (err) {
        console.error("Error loading groups:", err);
      }
    })();
  }, [user, isLoading]);

  const logoutClicked = async () => {
    await signOut();
    mutate(() => true, undefined, { revalidate: false }); // clear SWR cache
    navigate("/auth");
  };

  if (isLoading) return <CircularProgress />;
  if (error) return <Typography color="error">{error.message}</Typography>;
  if (!user) return <Typography>No user found.</Typography>;

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
      <Box sx={{ p: 0, mt: 2 }}>
        <Typography variant="body1" fontWeight={600}>
          
        </Typography>
      </Box>

      <Divider />

      <List>
        {/* HOME */}
        <ListItemButton
          sx={{pb: 3}}
          selected={pathname.startsWith("/")}
          onClick={() => navigate("/")}
        >
          <ListItemIcon>
            <DashboardIcon htmlColor="white" />
          </ListItemIcon>
          <ListItemText primary="Home"  sx={{ml: "-30px"}}/>
        </ListItemButton>

        <GradientDivider text="Groups" />

        {/* JOIN GROUP */}
        <ListItemButton
          selected={pathname === "/groupsearch"}
          onClick={() => navigate("/groupsearch")}
        >
          <ListItemIcon>
            <CheckBoxIcon htmlColor="white" />
          </ListItemIcon>
          <ListItemText primary="Join a Group" sx={{ml: "-30px"}}/>
        </ListItemButton>

        {/* START GROUP */}
        <ListItemButton
          sx={{pb: 3}}
          selected={pathname === "/creategroup"}
          onClick={() => navigate("/creategroup")}
        >
          <ListItemIcon>
            <KeyIcon htmlColor="white" />
          </ListItemIcon>
          <ListItemText primary="Start a Group"  sx={{ml: "-30px"}}/>
        </ListItemButton>

        <GradientDivider text="Collaborators" />

        {/* COLLABORATORS */}
        <ListItemButton
          
          selected={pathname.startsWith("/membersearch")}
          onClick={() => navigate("/membersearch")}
        >
          <ListItemIcon>
            <KeyboardIcon htmlColor="white" />
          </ListItemIcon>
          <ListItemText primary="Search Members"  sx={{ml: "-30px"}}/>
        </ListItemButton>

        <ListItemButton
          sx={{pb: 3}}
          selected={pathname.startsWith("/connectrequests")}
          onClick={() => navigate("/connectrequests")}
        >
          <ListItemIcon>
            <ConnectWithoutContactIcon htmlColor="white" />
          </ListItemIcon>
          <ListItemText primary="Connect Requests"  sx={{ml: "-30px"}}/>
            <Badge badgeContent={0} color="primary" />
        </ListItemButton>
        
        <GradientDivider text="My Stuff" />

        {/* PROFILE */}
        <ListItemButton
          selected={pathname.startsWith("/userprofile")}
          onClick={() => navigate("/userprofile")}
        >
          <ListItemIcon>
            <AccountBoxIcon htmlColor="white" />
          </ListItemIcon>
          <ListItemText primary="Profile"  sx={{ml: "-30px"}}/>
        </ListItemButton>

        {/* GROUPS SUBMENU */}
        <ListItemButton onClick={() => setGroupsOpen(!groupsOpen)}>
          <ListItemIcon>
            <GroupIcon htmlColor="white" />
          </ListItemIcon>
          <ListItemText primary="Groups"   sx={{ml: "-30px"}}/>
          {groupsOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={groupsOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding sx={{ pl: 4 }}>
            {groups && groups.length > 0 ? (
              groups.map((g) => (
                <ListItemButton
                  key={g.id}
                  selected={pathname === `/groups/${g.id}`}
                  onClick={() => navigate(`/groups/${g.id}`)}
                >
                  <ListItemText primary={g.name} />
                </ListItemButton>
              ))
            ) : (
              <ListItemButton disabled>
                <ListItemText primary="No Groups" />
              </ListItemButton>
            )}
          </List>
        </Collapse>

        {/* READINGS */}
        
        <ListItemButton
          selected={pathname.startsWith("/readings")}
          onClick={() => navigate("/readings")}
        >
          <ListItemIcon>
            <MenuBookIcon htmlColor="white" />
          </ListItemIcon>
          <ListItemText primary="Readings"  sx={{ml: "-30px"}}/>
        </ListItemButton>

        {/* DOCUMENTS SUBMENU */}
        <ListItemButton onClick={() => setDocsOpen(!docsOpen)}>
          <ListItemIcon>
            <CollectionsBookmarkIcon htmlColor="white" />
          </ListItemIcon>
          <ListItemText primary="Documents"  sx={{ml: "-30px"}}/>
          {docsOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={docsOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding sx={{ pl: 4 }}>
            <ListItemButton
              selected={pathname === "/filemanager/manuscript"}
              onClick={() => navigate("/filemanager/manuscript")}
            >
              <ListItemText primary="Manuscripts" />
            </ListItemButton>
            <ListItemButton
              selected={pathname === "/filemanager/feedback"}
              onClick={() => navigate("/filemanager/feedback")}
            >
              <ListItemText primary="Feedback" />
            </ListItemButton>
          </List>
        </Collapse>

        {/* <Divider sx={{ my: 2 }} /> */}
<img className="separator-line" src="/assets/images/separator-line.svg" alt="separator" />
        {/* SIGN OUT */}
        <ListItemButton onClick={logoutClicked}>
          <ListItemIcon>
            <LogoutIcon htmlColor="white" />
          </ListItemIcon>
          <ListItemText primary="Sign Out"  sx={{ml: "-30px"}}/>
        </ListItemButton>
      </List>
    </Drawer>
    </ThemeProvider>
  );
}
