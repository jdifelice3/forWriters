import { NavItem } from "../types/Nav"
import DashboardIcon from "@mui/icons-material/Dashboard";
import KeyboardIcon from "@mui/icons-material/Keyboard";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import GroupIcon from "@mui/icons-material/Group";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';

export const NAV_ITEMS: NavItem[] = [
  {
    label: "Dashboard",
    icon: <DashboardIcon />,
    path: "/dashboard",
  },
  {
    label: "Groups",
    icon: <GroupIcon />,
    path: "/groups/details",
  },
  {
    label: "Readings",
    icon: <MenuBookIcon />,
    path: "/readings",
  },
  {
    label: "Files",
    icon: <CollectionsBookmarkIcon />,
    path: "/files",
  },
  {
    label: "Members",
    icon: <ConnectWithoutContactIcon />,
    path: "/members",
  },
  {
    label: "Admin",
    icon: <KeyboardIcon />,
    path: "/admin",
    roles: ["ADMIN"],
  },
];
