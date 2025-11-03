import { useLocation, useNavigate } from "react-router-dom";
import { useTheme, GlobalStyles } from "@mui/material";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AccessAlarmsIcon from "@mui/icons-material/AccessAlarms";
import CottageOutlinedIcon from "@mui/icons-material/CottageOutlined";

function Sidebar() {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;

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
          {/* Home */}
          <MenuItem
            icon={<HomeOutlinedIcon />}
            active={pathname === "/"}
            onClick={() => navigate("/")}
          >
            Home
          </MenuItem>

          {/* Dashboard */}
          <MenuItem
            icon={<AccessAlarmsIcon />}
            active={pathname.startsWith("/dashboard")}
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </MenuItem>

          {/* Components group */}
          <SubMenu
            title="Components"
            icon={<CottageOutlinedIcon />}
            defaultOpen={pathname.startsWith("/component")}
          >
            <MenuItem
              active={pathname === "/component1"}
              onClick={() => navigate("/component1")}
            >
              Component 1
            </MenuItem>
            <MenuItem
              active={pathname === "/component2"}
              onClick={() => navigate("/component2")}
            >
              Component 2
            </MenuItem>
          </SubMenu>
        </Menu>
      </ProSidebar>
    </>
  );
}

export default Sidebar;
