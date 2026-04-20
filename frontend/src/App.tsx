import { SessionAuth } from "supertokens-auth-react/recipe/session";
import { BrowserRouter, Routes, Route  } from "react-router-dom";
import * as ReactRouter from "react-router-dom";
import SuperTokens, { SuperTokensWrapper } from "supertokens-auth-react";
import { ThemeProvider, createTheme } from "@mui/material";
import Layout from "./components/Layout";
import "react-pro-sidebar/dist/css/styles.css";
import "./assets/css/forWriters.css";
import { UserProvider } from "./context/UserContext";
import { getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react/ui";
import { PreBuiltUIList } from "./config";
import { SWRConfig } from "swr";
import { typedFetcher } from "./util/fetcher";
import { GroupContextProvider } from "./context/GroupContextProvider";
import EmailVerification from "supertokens-auth-react/recipe/emailverification";
import GroupInvite from "./pages/GroupInvite";

// ---------- Root App ----------
export default function App() {
    const theme = createTheme({
        typography: {
            fontSize: 12, 
        },
        palette: {
            primary: {
                main: "#2563EB", //"#3B82F6", 
            },
            secondary: {
                main: "#D1D5DB", 
            },
            warning: {
                main: "#DC2626"
            }
        },
    });
  return (
    <ThemeProvider theme={theme}>
        <SuperTokensWrapper>
            <SWRConfig value={{ fetcher: typedFetcher }}>
                <BrowserRouter>
                    <Routes>
                        {getSuperTokensRoutesForReactRouterDom(ReactRouter, PreBuiltUIList)}
                        
                        <Route 
                            path="/groups/:groupId/invite/accept" 
                            element={
                                <GroupContextProvider>
                                <GroupInvite />
                                </GroupContextProvider>
                            }                        
                        />

                        <Route
                            path="/*"
                            element={
                                <SessionAuth 
                                    requireAuth={false}
                                    overrideGlobalClaimValidators={(globalValidators) => [
                                        ...globalValidators,
                                        EmailVerification.EmailVerificationClaim.validators.isVerified(),
                                    ]}
                                >
                                    <UserProvider>
                                        <GroupContextProvider>
                                            <Layout />
                                        </GroupContextProvider>
                                    </UserProvider>
                                </SessionAuth>
                            }
                        />
                    </Routes>
                </BrowserRouter>
            </SWRConfig>
        </SuperTokensWrapper>
    </ThemeProvider>
  );
}


