import { useNavigate, Link } from "react-router-dom";
import {
    AppBar,
    Toolbar,
    Box,
} from "@mui/material";
import GroupSelector from "../../components/group/GroupSelector";
import UserMenu from "./UserMenu";
import NotificationsMenu from "./NotificationsMenu";

const TopNav = () => {
    const navigate = useNavigate();

    return (
    <AppBar 
        position="fixed" 
        color="default" 
        elevation={1} 
        sx={{
            backgroundColor: "white",
            zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
    >
    <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        
        {/* LEFT: Identity */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <header
                style={{
                marginLeft: "auto",
                backgroundColor: "#fff",
                borderBottom: "1px solid #ddd",
                padding: "0.5rem 1rem",
                display: "Flex",
                alignItems: "center",
                }}
            >
                <Link to="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
                    <img src="/forWriters-logo-black.png" alt="logo" style={{ width: 75, marginLeft: -50 }} />
                    <span style={{ 
                        fontFamily: "Thebarstaindemo", 
                        fontSize: "3.0rem", 
                        fontWeight: 500,
                        marginLeft: "-0.5rem", 
                        color: "#333" 
                    }}>
                        forWriters
                </span>
                <span style={{ color: "black" }}>&nbsp;&nbsp;&nbsp;where writers hone their craft</span>
                </Link>
            </header>
        </Box>

        {/* CENTER: Global Context */}
        <GroupSelector/>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <NotificationsMenu />
          <UserMenu />
        </Box>

      </Toolbar>
    </AppBar>
  );
};
export default TopNav;
