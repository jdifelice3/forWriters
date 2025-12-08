"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuperTokensConfig = void 0;
require("dotenv/config");
const emailpassword_1 = __importDefault(require("supertokens-node/recipe/emailpassword"));
const session_1 = __importDefault(require("supertokens-node/recipe/session"));
const dashboard_1 = __importDefault(require("supertokens-node/recipe/dashboard"));
const userroles_1 = __importDefault(require("supertokens-node/recipe/userroles"));
const dbUsers_1 = require("./database/dbUsers");
const client_1 = require("@prisma/client");
console.log('process.env.NODE_ENV', process.env.NODE_ENV);
console.log('apiDomain', process.env.ENV === "development" ? `${process.env.API_HOST}:${process.env.API_PORT}` : process.env.RENDER_EXTERNAL_URL || "");
exports.SuperTokensConfig = {
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
        emailpassword_1.default.init({
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
                            const newUser = await (0, dbUsers_1.createUser)(user.id, user.emails[0], client_1.Role.EDITOR);
                            console.log('newUserId', newUser.id);
                            console.log('newUser', newUser);
                        }
                        return response;
                    },
                }),
            },
        }),
        dashboard_1.default.init(),
        userroles_1.default.init(),
        session_1.default.init({
            useDynamicAccessTokenSigningKey: false,
            cookieSameSite: "none",
            cookieSecure: true,
            antiCsrf: "VIA_TOKEN"
        })
    ],
};
