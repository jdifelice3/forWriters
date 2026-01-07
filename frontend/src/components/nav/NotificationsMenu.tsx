import {
  IconButton,
  Badge,
  Menu,
  MenuItem,
  ListItemText,
  Typography,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useNotifications } from "../../hooks/notification/useNotifications";
import { useGroupContext } from "../../context/GroupContextProvider";

export default function NotificationsMenu() {
  const navigate = useNavigate();
  const { activeGroup } = useGroupContext();
  const { data: notifications = [] } = useNotifications(activeGroup?.id ?? null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const unreadCount = notifications.length;

  return (
    <>
      <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
        <Badge
          color="error"
          badgeContent={unreadCount > 0 ? unreadCount : undefined}
        >
          <NotificationsIcon />
        </Badge>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        sx={{ maxWidth: 360 }}
      >
        {notifications.length === 0 ? (
          <MenuItem disabled>
            <Typography color="text.secondary">
              No new notifications
            </Typography>
          </MenuItem>
        ) : (
          notifications.slice(0, 5).map((n) => (
            <MenuItem
              key={n.id}
              onClick={() => {
                navigate(n.href);
                setAnchorEl(null);
              }}
            >
              <ListItemText
                primary={n.message}
                primaryTypographyProps={{ fontWeight: 600 }}
              />
            </MenuItem>
          ))
        )}
      </Menu>
    </>
  );
}
