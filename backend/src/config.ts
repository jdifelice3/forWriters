import "dotenv/config";
import EmailPassword from "supertokens-node/recipe/emailpassword";
import Session from "supertokens-node/recipe/session";
import Dashboard from "supertokens-node/recipe/dashboard";
import UserRoles from "supertokens-node/recipe/userroles";
import type { TypeInput } from "supertokens-node/types";
import { createUser, createUserProfile } from "../src/database/dbUsers";
import { Role } from "@prisma/client";

export const SuperTokensConfig: TypeInput = {
    supertokens: {
        connectionURI: process.env.SUPERTOKENS_URI ?? "",
        apiKey: process.env.SUPERTOKENS_API_KEY,
    },
    appInfo: {
        appName: "forWriters",
        apiDomain: `${process.env.API_HOST}:${process.env.WEB_PORT}`,
        websiteDomain: `${process.env.WEB_HOST}:${process.env.WEB_PORT}`,
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
                            console.log("signUpPOST not implemented");
                            throw new Error("signUpPOST not implemented");
                        }

                        const response = await originalImplementation.signUpPOST(input);

                        if (response.status === "OK") {
                            const { user } = response;
                            console.log("New user signed up:", user);
                            const newUser = await createUser(user.id, user.emails[0],Role.ADMIN );
                            console.log('newUserId', newUser.id);
                            console.log('newUser',newUser);
                            await createUserProfile(newUser.id);
                        }

                        return response;
                    },
                }),
            },
        }),
        Dashboard.init(),
        UserRoles.init(),
        Session.init()
    ],
};