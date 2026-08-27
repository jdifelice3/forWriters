import {
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Divider,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "supertokens-auth-react/recipe/session";
import { useUserContext } from "../../context/UserContext";
import { suspendSessionRequests } from "../../auth/sessionScope";

export default function UserMenu() {
  const navigate = useNavigate();
  const { user } = useUserContext();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [signingOut, setSigningOut] = useState(false);
  const profile = user?.userProfile;
  const displayName = [profile?.firstName, profile?.lastName].filter(Boolean).join(" ");
  const initials = displayName
    ? displayName.split(/\s+/).slice(0, 2).map((part) => part[0]).join("").toUpperCase()
    : user?.email?.slice(0, 1).toUpperCase();

  return (
    <>
      <IconButton
        aria-label="Open profile menu"
        disabled={signingOut}
        onClick={(e) => setAnchorEl(e.currentTarget)}
      >
        <Avatar
          alt={displayName || "Your profile"}
          src={profile?.avatarUrl ?? undefined}
          sx={{ width: 32, height: 32 }}
        >
          {initials}
        </Avatar>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem
          onClick={() => {
            navigate("/userprofile");
            setAnchorEl(null);
          }}
        >
          Profile
        </MenuItem>

        <Divider />

        <MenuItem
          onClick={async () => {
            setAnchorEl(null);
            setSigningOut(true);
            suspendSessionRequests();
            try {
              await signOut();
            } finally {
              window.location.replace("/auth");
            }
          }}
        >
          {signingOut ? "Signing out…" : "Sign out"}
        </MenuItem>
      </Menu>
    </>
  );
}
