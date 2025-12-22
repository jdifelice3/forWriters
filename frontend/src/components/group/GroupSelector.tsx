import {
  Button,
  Menu,
  MenuItem,
  ListItemText,
  Divider,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGroupContext } from "../../context/GroupContextProvider";

export default function GroupSelector() {
  const navigate = useNavigate();
  const { activeGroup, groups, setActiveGroup } = useGroupContext();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  return (
    <>
      <Button
        onClick={(e) => setAnchorEl(e.currentTarget)}
        endIcon={<ExpandMoreIcon />}
        variant="outlined"
        //disabled={groups.length === 0}
        sx={{ textTransform: "none", minWidth: 220 }}
      >
        {activeGroup ? activeGroup.name : "Select a group"}
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
      >
        {groups.map((g) => (
          <MenuItem
            key={g.id}
            selected={activeGroup?.id === g.id}
            onClick={() => {
              setActiveGroup(g);
              //navigate(`/groups/details`);
              setAnchorEl(null);
            }}
          >
            <ListItemText
              primary={g.name}
              secondary={g.role === "ADMIN" ? "Admin" : undefined}
            />
          </MenuItem>
        ))}

        <Divider />

        <MenuItem
          onClick={() => {
            navigate("/creategroup");
            setAnchorEl(null);
          }}
        >
          <Typography color="primary">Start a group</Typography>
        </MenuItem>

        <MenuItem
          onClick={() => {
            navigate("/groupsearch");
            setAnchorEl(null);
          }}
        >
          <Typography color="primary">Join a group</Typography>
        </MenuItem>
      </Menu>
    </>
  );
}
