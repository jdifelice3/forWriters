import { useLocation, useNavigate } from "react-router-dom";
import { useTheme, GlobalStyles } from "@mui/material";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { useSessionContext, signOut } from "supertokens-auth-react/recipe/session";
import MenuBookIcon from '@mui/icons-material/MenuBook';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import GroupIcon from '@mui/icons-material/Group';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LogoutIcon from '@mui/icons-material/Logout';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';

function Sidebar() {
  const session = useSessionContext();
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;

  const logoutClicked = async() => {
      await signOut();
      navigate("/auth");
  }

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
            icon={<DashboardIcon />}
            active={pathname.startsWith("/dashboard")}
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </MenuItem>
          {/* Writing Groups */}
            <SubMenu
              title="Writing Groups"
              icon={<GroupIcon />}
              defaultOpen={pathname.startsWith("/component")}
            >
            <MenuItem
              active={pathname === "/writersgroup"}
              onClick={() => navigate("/writersgroup")}
            >
              Bucks County Writers Group
            </MenuItem>
            <img className="separator-line" src="/assets/images/separator-line.svg" alt="separator" />
            <MenuItem
              active={pathname === "/searchgroups"}
              onClick={() => navigate("/searchgroups")}
            >
              Search Groups
            </MenuItem>
            <MenuItem
              active={pathname === "/managegroup"}
              onClick={() => navigate("/managegroup")}
            >
              Manage a Group
            </MenuItem>
          </SubMenu>
          <MenuItem
            icon={<KeyboardIcon />}
            active={pathname.startsWith("/writers")}
            onClick={() => navigate("/writers")}
          >
            Writers
          </MenuItem>
          <MenuItem
            icon={<MenuBookIcon />}
            active={pathname.startsWith("/readers")}
            onClick={() => navigate("/readers")}
          >
            Readers
          </MenuItem>
          <img className="separator-line" src="/assets/images/separator-line.svg" alt="separator" />
          <MenuItem
            icon={<AccountBoxIcon />}
            active={pathname.startsWith("/profile")}
            onClick={() => navigate("/profile")}
          >  
            Profile
          </MenuItem>
          <MenuItem
            icon={<CollectionsBookmarkIcon />}
            active={pathname.startsWith("/works")}
            onClick={() => navigate("/works")}
          >  
            Your Work
          </MenuItem>
          <MenuItem
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
