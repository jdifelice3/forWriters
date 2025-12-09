import "dotenv/config";
import EmailPassword from "supertokens-node/recipe/emailpassword";
//import Session from "supertokens-node/recipe/session";
import Session from "supertokens-node/recipe/session/index.js";
import Dashboard from "supertokens-node/recipe/dashboard";
import UserRoles from "supertokens-node/recipe/userroles";
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
            override: {
                apis: (originalImplementation) => ({
                ...originalImplementation,

                    // Override the default signUpPOST
                    async signUpPOST(input) {
                        if (!originalImplementation.signUpPOST) {
                            console.error("signUpPOST not implemented");
                            throw new Error("signUpPOST not implemented");
                        }

                        const response = await originalImplementation.signUpPOST(input);

                        if (response.status === "OK") {
                            const { user } = response;
                            console.log("New user signed up:", user);
                            const newUser = await createUser(user.id, user.emails[0],Role.EDITOR );
                            console.log('newUserId', newUser.id);
                            console.log('newUser',newUser);
                           
                        }

                        return response;
                    },
                }),
            },
        }),
        Dashboard.init(),
        UserRoles.init(),
        Session.init({
            useDynamicAccessTokenSigningKey: false,
            cookieSameSite: "none",
            cookieSecure: true,
            antiCsrf: "VIA_TOKEN",
            cookieDomain: ".forwriters.ink",
        }),
        
    ],
};