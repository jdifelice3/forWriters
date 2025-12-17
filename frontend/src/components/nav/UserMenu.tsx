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

export default function UserMenu() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  return (
    <>
      <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
        <Avatar sx={{ width: 32, height: 32 }} />
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
            await signOut();
            navigate("/auth");
          }}
        >
          Sign out
        </MenuItem>
      </Menu>
    </>
  );
}
