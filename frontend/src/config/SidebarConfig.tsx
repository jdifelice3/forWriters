import { NavItem } from "../types/NavTypes"
import DashboardIcon from "@mui/icons-material/Dashboard";
import KeyboardIcon from "@mui/icons-material/Keyboard";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import GroupIcon from "@mui/icons-material/Group";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';

export const NAV_ITEMS: NavItem[] = [
  {
    label: "Dashboard",
    icon: <DashboardIcon htmlColor="white"/>,
    path: "/dashboard",
  },
  {
    label: "Group",
    icon: <GroupIcon htmlColor="white"/>,
    path: "/groups/details",
  },
  {
    label: "Readings",
    icon: <MenuBookIcon htmlColor="white"/>,
    path: "/readings",
  },
  {
    label: "Files",
    icon: <CollectionsBookmarkIcon htmlColor="white"/>,
    path: "/files",
  },
  {
    label: "Members",
    icon: <ConnectWithoutContactIcon htmlColor="white"/>,
    path: "/members",
  },
  {
    label: "Admin",
    icon: <KeyboardIcon htmlColor="white"/>,
    path: "/admin",
    roles: ["ADMIN"],
  },
];
