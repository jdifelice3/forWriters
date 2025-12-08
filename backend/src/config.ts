import "dotenv/config";
import EmailPassword from "supertokens-node/recipe/emailpassword";
import Session from "supertokens-node/recipe/session";
import Dashboard from "supertokens-node/recipe/dashboard";
import UserRoles from "supertokens-node/recipe/userroles";
import type { TypeInput } from "supertokens-node/types";
import { createUser } from "./database/dbUsers";
import { Role } from "@prisma/client";

console.log('process.env.NODE_ENV', process.env.NODE_ENV);
console.log('apiDomain',process.env.ENV === "development" ? `${process.env.API_HOST}:${process.env.API_PORT}` :  process.env.RENDER_EXTERNAL_URL || "");

export const SuperTokensConfig: TypeInput = {
    supertokens: {
        // connectionURI: "http://localhost:3567",  //for self-hosted
        // apiKey: undefined
        connectionURI: "https://st-dev-06512a21-d3b1-11f0-98c6-a51615ad7bad.aws.supertokens.io",
        apiKey: "Y1oFrXaii8MlkvNl83bP2Zeyr1"

    },
    appInfo: {
        appName: "forWriters",
        apiDomain: "http://localhost:3001",
        //apiDomain: process.env.ENV === "DEV" ? `${process.env.API_HOST}:${process.env.API_PORT}` :  process.env.RENDER_EXTERNAL_URL || "", 
        //websiteDomain: `${process.env.WEB_HOST}:${process.env.WEB_PORT}`,
        websiteDomain: "http://localhost:3000",
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
            antiCsrf: "VIA_TOKEN"
        })
    ],
};