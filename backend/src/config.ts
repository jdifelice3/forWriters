import "dotenv/config";
import EmailPassword from "supertokens-node/recipe/emailpassword";
import Session from "supertokens-node/recipe/session/index.js";
import Dashboard from "supertokens-node/recipe/dashboard";
import UserRoles from "supertokens-node/recipe/userroles";
import UserMetadata from "supertokens-node/recipe/usermetadata";
import type { TypeInput } from "supertokens-node/types";
import { createUser } from "./database/dbUsers";
import { Role } from "@prisma/client";


if (typeof process.env.SUPERTOKENS_CONNECTION_URI === 'undefined') {
  throw new Error("Environment variable process.env.SUPERTOKENS_CONNECTION_URI is undefined");
}
if (typeof process.env.SUPERTOKENS_API_KEY === 'undefined') {
  throw new Error("Environment variable process.env.SUPERTOKENS_API_KEY is undefined");
}
if (typeof process.env.APP_NAME === 'undefined') {
  throw new Error("Environment variable process.env.APP_NAME is undefined");
}
if (typeof process.env.API_DOMAIN === 'undefined') {
  throw new Error("Environment variable process.env.API_DOMAIN is undefined");
}
if (typeof process.env.WEBSITE_DOMAIN === 'undefined') {
  throw new Error("Environment variable process.env.WEBSITE_DOMAIN is undefined");
}

const sessionInit = process.env.NODE_ENV === 'production' ?
        Session.init({
            useDynamicAccessTokenSigningKey: false,
            cookieSameSite: "none",
            cookieSecure: true,
            antiCsrf: "VIA_TOKEN",
            cookieDomain: ".forwriters.ink",
        })
        :
        Session.init({
            useDynamicAccessTokenSigningKey: false,
            cookieSameSite: "none",
            cookieSecure: true,
            antiCsrf: "VIA_TOKEN",
        })

export const SuperTokensConfig: TypeInput = {
    supertokens: {
        connectionURI: process.env.SUPERTOKENS_CONNECTION_URI,
        apiKey: process.env.SUPERTOKENS_API_KEY
    },
    appInfo: {
        appName: process.env.APP_NAME,
        apiDomain: process.env.API_DOMAIN,
        websiteDomain: process.env.WEBSITE_DOMAIN,
        apiBasePath: "/auth",
        websiteBasePath: "/auth",   
    },
    recipeList: [
EmailPassword.init({
  signUpFeature: {
    formFields: [
      {
        id: "firstName",
        validate: async (value) => {
          if (!value || typeof value !== "string" || !value.trim()) {
            return "First name is required";
          }
          return undefined;
        },
      },
      {
        id: "lastName",
        validate: async (value) => {
          if (!value || typeof value !== "string" || !value.trim()) {
            return "Last name is required";
          }
          return undefined;
        },
      },
    ],
  },

  override: {
    apis: (originalImplementation) => ({
      ...originalImplementation,

      async signUpPOST(input) {
        const response = await originalImplementation.signUpPOST!(input);

        if (response.status === "OK") {
          const firstName = String(
            input.formFields.find(f => f.id === "firstName")!.value
          );

          const lastName = String(
            input.formFields.find(f => f.id === "lastName")!.value
          );

          await createUser(
            response.user.id,
            response.user.emails[0],
            firstName,
            lastName,
            Role.EDITOR
          );
        }

        return response;
      },
    }),
  },
}),

        Dashboard.init(),
        UserRoles.init(),
        sessionInit        
    ],
};