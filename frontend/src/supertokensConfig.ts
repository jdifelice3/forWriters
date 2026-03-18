"use client";

import React from "react";
import EmailPassword from "supertokens-auth-react/recipe/emailpassword";
import Session from "supertokens-auth-react/recipe/session";
import { mutate } from "swr";
import EmailVerification from "supertokens-auth-react/recipe/emailverification";
import { EmailPasswordPreBuiltUI } from "supertokens-auth-react/recipe/emailpassword/prebuiltui";
import { EmailVerificationPreBuiltUI } from "supertokens-auth-react/recipe/emailverification/prebuiltui";

export const SuperTokensConfig = {
  appInfo: {
    appName: "forWriters",
    apiDomain: import.meta.env.VITE_API_HOST,
    websiteDomain: import.meta.env.VITE_WEB_HOST,
    apiBasePath: "/auth",
  },

  recipeList: [
EmailPassword.init({
  signInAndUpFeature: {
    signUpForm: {
      formFields: [
        {
          id: "firstName",
          label: "First Name",
          placeholder: "Enter your first name",
          validate: async (value) => {
            if (!value?.trim()) return "First name is required";
            return undefined;
          },
        },
        {
          id: "lastName",
          label: "Last Name",
          placeholder: "Enter your last name",
          validate: async (value) => {
            if (!value?.trim()) return "Last name is required";
            return undefined;
          },
        },
        {
          id: "email",
          label: "Email",
          placeholder: "Enter your email",
        },
        {
          id: "password",
          label: "Password",
          placeholder: "Enter your password",
        },
      ],
    },
  },
}),
EmailVerification.init(),

    Session.init({
      tokenTransferMethod: "cookie",
      onHandleEvent: async (event) => {
        if (event.action === "SESSION_CREATED") {
          console.log("SESSION_CREATED → revalidating user...");
          await mutate(`${import.meta.env.VITE_API_HOST}/api/me`);
        }
      },
    }),
  ],

  getRedirectionURL: async (context: any) => {
    if (context.action === "SUCCESS") {
      return "/dashboard";
    }
    return undefined;
  },
};

export const PreBuiltUIList = [EmailPasswordPreBuiltUI, EmailVerificationPreBuiltUI];
