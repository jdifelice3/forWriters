import "dotenv/config";
import EmailPassword from "supertokens-node/recipe/emailpassword";
import Session from "supertokens-node/recipe/session";
import Dashboard from "supertokens-node/recipe/dashboard";
import UserRoles from "supertokens-node/recipe/userroles";
import type { TypeInput } from "supertokens-node/types";

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
        EmailPassword.init(),
        Dashboard.init(),
        UserRoles.init(),
        Session.init()
    ],
};