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

// ---------- Root App ----------
export default function App() {
    const theme = createTheme({
        typography: {
            fontSize: 12, // Change this value to your preferred font size
        },
    });
  return (
    <ThemeProvider theme={theme}>
        <SuperTokensWrapper>
            <SWRConfig value={{ fetcher: typedFetcher }}>
                <BrowserRouter>
                    <Routes>
                         {/* Supertokens built-in auth routes (login, signup, reset password, etc.) */}
                        {getSuperTokensRoutesForReactRouterDom(ReactRouter, PreBuiltUIList)}
                        {/* All your application routes, wrapped in Layout */}
                        <Route
                            path="/*"
                            element={
                                <SessionAuth requireAuth={false}>
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


