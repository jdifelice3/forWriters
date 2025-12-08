"use client";

import React from 'react';
import EmailPassword from "supertokens-auth-react/recipe/emailpassword";
import { EmailPasswordPreBuiltUI } from "supertokens-auth-react/recipe/emailpassword/prebuiltui";
import Session from "supertokens-auth-react/recipe/session";
import { mutate } from "swr";

export const SuperTokensConfig = {
    appInfo: {
        appName: "forWriters",
        apiDomain: "http://localhost:3001",
        websiteDomain: "http://localhost:3000",
        apiBasePath: "/auth",
        websiteBasePath: "/auth",
    },
    
    recipeList: [
        EmailPassword.init(),
        Session.init({
            tokenTransferMethod: "cookie",
            onHandleEvent: async (event) => {
                if (event.action === "SESSION_CREATED") {
                console.log("SESSION_CREATED → revalidating user...");
                await mutate(`${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}/api/me`);
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

export const PreBuiltUIList = [EmailPasswordPreBuiltUI];



export const ComponentWrapper = (props: { children: React.JSX.Element }): React.JSX.Element => {
    const childrenToRender = props.children;

    
    return childrenToRender;
}