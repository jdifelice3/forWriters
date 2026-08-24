import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { useGroupContext } from "../../context/GroupContextProvider";
import GroupSelector from "../group/GroupSelector";
import NotificationsMenu from "../nav/NotificationsMenu";
import UserMenu from "../nav/UserMenu";

export default function StudioTopNav() {
  const { activeGroup } = useGroupContext();

  return (
    <AppBar className="studio-topnav" position="fixed" elevation={0}>
      <Toolbar>
        <Box className="studio-topnav-context">
          <Typography>{activeGroup ? "Active workspace" : "Your workspace"}</Typography>
          <strong>{activeGroup?.name ?? "Set up your first group"}</strong>
        </Box>

        <GroupSelector variant="studio" />

        <Box className="studio-topnav-actions">
          <NotificationsMenu />
          <UserMenu />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
