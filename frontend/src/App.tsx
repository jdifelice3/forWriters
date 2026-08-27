import { SessionAuth, useSessionContext } from "supertokens-auth-react/recipe/session";
import { BrowserRouter, Routes, Route  } from "react-router-dom";
import { useEffect, useMemo } from "react";
import * as ReactRouter from "react-router-dom";
import { Box, CircularProgress, ThemeProvider, Typography, createTheme } from "@mui/material";
import Layout from "./components/Layout";
import "react-pro-sidebar/dist/css/styles.css";
import "./assets/css/forWriters.css";
import { UserProvider } from "./context/UserContext";
import { getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react/ui";
import { PreBuiltUIList } from "./supertokensConfig";
import { SWRConfig } from "swr";
import { typedFetcher } from "./util/fetcher";
import { GroupContextProvider } from "./context/GroupContextProvider";
import EmailVerification from "supertokens-auth-react/recipe/emailverification";
import GroupInvite from "./pages/GroupInvite";
import ReadingNotification from "./pages/ReadingNotification";
import {
    activateSessionRequestScope,
    suspendSessionRequests,
} from "./auth/sessionScope";

const requireEmailVerification =
    import.meta.env.VITE_REQUIRE_EMAIL_VERIFICATION !== "false" &&
    import.meta.env.VITE_WEB_HOST === "https://app.forwriters.ink";

function SessionStartupScreen() {
    const session = useSessionContext();

    if (!session.loading) return null;

    return (
        <Box
            role="status"
            aria-live="polite"
            sx={{
                position: "fixed",
                inset: 0,
                zIndex: (theme) => theme.zIndex.modal + 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background:
                    "radial-gradient(circle at 50% 32%, #eef5f0 0%, #f8faf8 42%, #ffffff 78%)",
                color: "#253a2c",
            }}
        >
            <Box sx={{ textAlign: "center", px: 3 }}>
                <CircularProgress size={30} thickness={4} sx={{ color: "#315b42" }} />
                <Typography
                    sx={{
                        mt: 2,
                        fontFamily: "Georgia, serif",
                        fontSize: 22,
                        fontWeight: 700,
                    }}
                >
                    Opening forWriters…
                </Typography>
                <Typography sx={{ mt: 0.75, color: "#6d786f", fontSize: 12 }}>
                    Restoring your secure session and group workspace.
                </Typography>
            </Box>
        </Box>
    );
}

function SessionScopedWorkspace({ userId }: { userId: string }) {
    const cache = useMemo(() => {
        activateSessionRequestScope(userId);
        return new Map();
    }, [userId]);

    useEffect(
        () => () => {
            suspendSessionRequests(userId);
        },
        [userId],
    );

    return (
        <SWRConfig
            value={{
                fetcher: typedFetcher,
                provider: () => cache,
            }}
        >
            <UserProvider>
                <GroupContextProvider>
                    <Layout />
                </GroupContextProvider>
            </UserProvider>
        </SWRConfig>
    );
}

function AuthenticatedWorkspace() {
    const session = useSessionContext();

    if (session.loading || !session.doesSessionExist) return null;

    return (
        <SessionScopedWorkspace key={session.userId} userId={session.userId} />
    );
}

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
        <SWRConfig value={{ fetcher: typedFetcher }}>
            <BrowserRouter>
                    <SessionStartupScreen />
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
                            path="/groups/:groupId/readings/:readingId/notification"
                            element={
                                <GroupContextProvider>
                                <ReadingNotification />
                                </GroupContextProvider>
                            }                        
                        />
                        <Route
                            path="/*"
                            element={
                                <SessionAuth 
                                    requireAuth={true}
                                    overrideGlobalClaimValidators={(globalValidators) =>
                                        requireEmailVerification
                                            ? globalValidators
                                            : globalValidators.filter(
                                                (validator) =>
                                                    validator.id !== EmailVerification.EmailVerificationClaim.id,
                                            )
                                    }
                                >
                                    <AuthenticatedWorkspace />
                                </SessionAuth>
                            }
                        />
                    </Routes>
            </BrowserRouter>
        </SWRConfig>
    </ThemeProvider>
  );
}
