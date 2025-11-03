import SuperTokens, { SuperTokensWrapper } from "supertokens-auth-react";
import { getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react/ui";
import { SessionAuth } from "supertokens-auth-react/recipe/session";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import * as ReactRouter from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { PreBuiltUIList, SuperTokensConfig, ComponentWrapper } from "./config";
import Home from "./pages/Home";
import LoginSuccess from "./pages/LoginSuccess";
import { Sidebar, Menu, MenuItem, Submenu, Logo } from "react-mui-sidebar";
//import AccessAlarms from "@mui/icons-material/AccessAlarms";
//import CottageOutlinedIcon from "@mui/icons-material/CottageOutlined";

SuperTokens.init(SuperTokensConfig);// Initialize SuperTokens - ideally in the global scope

function App() {
    return (
        <SuperTokensWrapper>
            <BrowserRouter>
                <main className="App app-container">
                    <header>
                        <nav className="header-container">
                            <Link to="/">
                                <img src="/forWriters-logo-black.png" alt="forWriters" style={{width:75}}/>
                            </Link>
                        </nav>
                    </header>
                    <div>
                    <div className="fill" id="home-container">
                        <ComponentWrapper>
                            <Routes>
                                <Route path="/" element={<Home />} />
                                {/* This shows the login UI on "/auth" route */}
                                {getSuperTokensRoutesForReactRouterDom(ReactRouter, PreBuiltUIList)}

                                {/* This protects the "/dashboard" route so that it shows
                                <Dashboard /> only if the user is logged in.
                                Else it redirects the user to "/auth" */}
                                <Route path="/dashboard" element={<SessionAuth><Dashboard /></SessionAuth>}/>
                                <Route path="/loginSuccess" element={<SessionAuth><LoginSuccess /></SessionAuth>}/>
                            </Routes>
                        </ComponentWrapper>
                        <img className="separator-line" src="/assets/images/separator-line.svg" alt="separator" />
                    </div>
                    </div>
                </main>
            </BrowserRouter>
        </SuperTokensWrapper>
    );
}

export default App;
