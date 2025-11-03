import SuperTokens, { SuperTokensWrapper } from "supertokens-auth-react";
import { getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react/ui";
import { SessionAuth } from "supertokens-auth-react/recipe/session";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import * as ReactRouter from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { PreBuiltUIList, SuperTokensConfig, ComponentWrapper } from "./config";
import Home from "./pages/Home";
import LoginSuccess from "./pages/LoginSuccess";


import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";

import "react-pro-sidebar/dist/css/styles.css"; // ✅ now exists again
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AccessAlarms from "@mui/icons-material/AccessAlarms";
import CottageOutlinedIcon from "@mui/icons-material/CottageOutlined";

SuperTokens.init(SuperTokensConfig);// Initialize SuperTokens - ideally in the global scope

function App() {
    return (
              <SuperTokensWrapper>
            <BrowserRouter>
  <ProSidebar>
  <Menu iconShape="square">
    <MenuItem icon={<AccessAlarms />}>Dashboard</MenuItem>
    
    <SubMenu title="Components" icon={<CottageOutlinedIcon />}>
      <MenuItem>Component 1</MenuItem>
      <MenuItem>Component 2</MenuItem>
    </SubMenu>
  </Menu>
</ProSidebar>
            </BrowserRouter>
        </SuperTokensWrapper>
        
    );
}

export default App;


// <SuperTokensWrapper>
        //     <BrowserRouter>
        //         <main className="App app-container">
        //             <header>
        //                 <nav className="header-container">
        //                     <Link to="/">
        //                         <img src="/forWriters-logo-black.png" alt="forWriters" style={{width:75}}/>
        //                     </Link>
        //                 </nav>
        //             </header>
        //             <div className="fill" id="home-container">
        //                 <ComponentWrapper>
        //                     <Routes>
        //                         <Route path="/" element={<Home />} />
        //                         {/* This shows the login UI on "/auth" route */}
        //                         {getSuperTokensRoutesForReactRouterDom(ReactRouter, PreBuiltUIList)}

        //                         {/* This protects the "/dashboard" route so that it shows
        //                         <Dashboard /> only if the user is logged in.
        //                         Else it redirects the user to "/auth" */}
        //                         <Route path="/dashboard" element={<SessionAuth><Dashboard /></SessionAuth>}/>
        //                         <Route path="/loginSuccess" element={<SessionAuth><LoginSuccess /></SessionAuth>}/>
        //                     </Routes>
        //                 </ComponentWrapper>
        //                 <img className="separator-line" src="/assets/images/separator-line.svg" alt="separator" />
        //             </div>
        //         </main>
        //     </BrowserRouter>
        // </SuperTokensWrapper>