"use client";

import React from 'react';
import EmailPassword from "supertokens-auth-react/recipe/emailpassword";
import { EmailPasswordPreBuiltUI } from "supertokens-auth-react/recipe/emailpassword/prebuiltui";
import Session from "supertokens-auth-react/recipe/session";
import EmailVerification from "supertokens-auth-react/recipe/emailverification";
import {
    clearLegacyActiveGroupStorage,
    suspendSessionRequests,
} from "./auth/sessionScope";

const tokenTransferMethod =
  import.meta.env.VITE_WEB_HOST === "https://app.forwriters.ink"
    ? "cookie"
    : "header";
import { EmailVerificationPreBuiltUI } from "supertokens-auth-react/recipe/emailverification/prebuiltui";

export const SuperTokensConfig = {
    appInfo: {
        appName: "forWriters",
        apiDomain: import.meta.env.VITE_API_HOST,
        websiteDomain: import.meta.env.VITE_WEB_HOST,
        apiBasePath: "/auth",
        websiteBasePath: "/auth",
    },
    
    recipeList: [
        EmailPassword.init(),
        EmailVerification.init(),
        Session.init({
            tokenTransferMethod,
            onHandleEvent: (event) => {
                if (event.action === "SESSION_CREATED") {
                    clearLegacyActiveGroupStorage();
                }
                if (event.action === "SIGN_OUT" || event.action === "UNAUTHORISED") {
                    suspendSessionRequests();
                }
            }
        })
    ],
    getRedirectionURL: async (context: any) => {
        if (context.action === "SUCCESS") {
            return "/";
        }
        if (context.createdNewUser){
            // store userId in database
        }
        return undefined;
    },
};

export const recipeDetails = {
    docsLink: "https://supertokens.com/docs/quickstart/introduction",
};

export const PreBuiltUIList = [EmailPasswordPreBuiltUI, EmailVerificationPreBuiltUI];



export const ComponentWrapper = (props: { children: React.JSX.Element }): React.JSX.Element => {
    const childrenToRender = props.children;

    
    return childrenToRender;
}
