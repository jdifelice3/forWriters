import {
  Box,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import AutoStoriesRoundedIcon from "@mui/icons-material/AutoStoriesRounded";
import CollectionsBookmarkRoundedIcon from "@mui/icons-material/CollectionsBookmarkRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import SpaceDashboardRoundedIcon from "@mui/icons-material/SpaceDashboardRounded";
import { useLocation, useNavigate } from "react-router-dom";
import { useGroupContext } from "../../context/GroupContextProvider";

const drawerWidth = 230;

export default function StudioSidebar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { activeGroup } = useGroupContext();

  const critiquePath = activeGroup
    ? `/groups/${activeGroup.id}/critique`
    : "/studio";

  return (
    <Drawer
      className="studio-sidebar"
      variant="permanent"
      anchor="left"
      sx={{ width: drawerWidth, flexShrink: 0 }}
    >
      <Box className="studio-brand" onClick={() => navigate("/studio")}>
        <span>fW</span>
        <Box>
          <Typography component="strong">forWriters</Typography>
          <Typography>Critique Studio</Typography>
        </Box>
      </Box>

      <Typography className="studio-nav-label">Workspace</Typography>
      <List>
        <ListItemButton
          selected={
            pathname === "/" ||
            pathname === "/studio" ||
            pathname === "/dashboard" ||
            pathname.includes("/critique") ||
            pathname.includes("/workflow") ||
            pathname.includes("/review")
          }
          onClick={() => navigate(critiquePath)}
        >
          <ListItemIcon><AutoStoriesRoundedIcon /></ListItemIcon>
          <ListItemText primary="Critique Studio" secondary="Submit · Assign · Review" />
        </ListItemButton>

        <ListItemButton
          selected={pathname.startsWith("/groups/") && !pathname.includes("/readings") && !pathname.includes("/critique")}
          onClick={() => navigate(activeGroup ? `/groups/${activeGroup.id}` : "/creategroup")}
        >
          <ListItemIcon><GroupsRoundedIcon /></ListItemIcon>
          <ListItemText primary="Groups" />
        </ListItemButton>

        <ListItemButton
          selected={pathname.includes("/readings") && !pathname.includes("/workflow") && !pathname.includes("/review")}
          disabled={!activeGroup}
          onClick={() => activeGroup && navigate(`/groups/${activeGroup.id}/readings`)}
        >
          <ListItemIcon><MenuBookRoundedIcon /></ListItemIcon>
          <ListItemText primary="Readings" />
        </ListItemButton>

        <ListItemButton
          selected={pathname.startsWith("/files") || pathname.startsWith("/filemanager")}
          onClick={() => navigate("/files")}
        >
          <ListItemIcon><CollectionsBookmarkRoundedIcon /></ListItemIcon>
          <ListItemText primary="Manuscripts" />
        </ListItemButton>
      </List>

      <Divider />
      <Typography className="studio-nav-label">Existing application</Typography>
      <List>
        <ListItemButton
          selected={pathname === "/legacy-dashboard"}
          onClick={() => navigate("/legacy-dashboard")}
        >
          <ListItemIcon><SpaceDashboardRoundedIcon /></ListItemIcon>
          <ListItemText primary="Classic dashboard" />
        </ListItemButton>
      </List>

      <Box className="studio-sidebar-footnote">
        <span>STAGING</span>
        <Typography>Live services, prototype experience</Typography>
      </Box>
    </Drawer>
  );
}
