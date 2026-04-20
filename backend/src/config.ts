import "dotenv/config";
import { AuthEventType, AuthOutcome, Role } from "@prisma/client";
import crypto from "crypto";
import EmailPassword from "supertokens-node/recipe/emailpassword";
import Session from "supertokens-node/recipe/session/index.js";
import Dashboard from "supertokens-node/recipe/dashboard";
import UserRoles from "supertokens-node/recipe/userroles";
import type { TypeInput } from "supertokens-node/types";
import { createUser } from "./database/dbUsers";
import { recordAuthSuccess, logAuthEvent, sha256, stReqToRequestLike } from "./audit/authAudit";
import type { BaseRequest } from "supertokens-node/lib/build/framework/request";
import AccountLinking from "supertokens-node/recipe/accountlinking";
import { recordAuthFailure } from "./audit/authAudit";
//import { sendEmail } from "./util/email";
import EmailVerification from "supertokens-node/recipe/emailverification";
import { RecipeUserId } from "supertokens-node";
import { Resend } from "resend";

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
    });

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
        AccountLinking.init({
            shouldDoAutomaticAccountLinking: async () => ({
                shouldAutomaticallyLink: false
            })
        }),
        EmailPassword.init({
            emailDelivery: {
                override: (originalImplementation) => ({
                    ...originalImplementation,
                    sendEmail: async (input) => {
                        console.log("input.type",input.type);
                        if (input.type === "PASSWORD_RESET") {
                            const resetLink = input.passwordResetLink;
                            const resend = new Resend(process.env.RESEND_API_KEY);
                            const result = await resend.emails.send({
                                //from: process.env.EMAIL_FROM?
                                from: "support@forwriters.ink",
                                to: input.user.email,
                                subject: "Reset your password",
                                html: `
                                <p>You requested a password reset for forWriters.</p>
                                <p><a href="${resetLink}">Reset your password</a></p>
                                <p>If you did not request this, you can ignore this email.</p>
                                `,
                                text: `Reset your password: ${resetLink}`,

                            });
                            console.log("SES SEND RESULT:", result);
                            return;
                        }

                        return originalImplementation.sendEmail(input);
                    },
                }),
            },
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
                        const res = await originalImplementation.signUpPOST!(input);

                        if (res.status === "OK") {
                            const firstName = String(
                                input.formFields.find(f => f.id === "firstName")!.value
                            );

                            const lastName = String(
                                input.formFields.find(f => f.id === "lastName")!.value
                            );

                            await createUser(
                                res.user.id,
                                res.user.emails[0],
                                firstName,
                                lastName,
                                Role.EDITOR
                            );
                        }

                        const reqLike = stReqToRequestLike(input.options.req);
                        if (res.status === "OK") {
                            await logAuthEvent({
                            req: reqLike,
                            type: AuthEventType.SIGN_UP,
                            outcome: AuthOutcome.SUCCESS,
                            superTokensId: res.user.id,
                            email: res.user.emails[0],
                            });
                        } else {
                            await logAuthEvent({
                            req: reqLike,
                            type: AuthEventType.SIGN_UP,
                            outcome: AuthOutcome.FAILURE,
                            reasonCode: res.status,
                            });
                        }

                        return res;
                    },
                    async signInPOST(input) {
                        const response = await originalImplementation.signInPOST!(input);

                        if (response.status === "OK") {
                            const recipeUserId = new RecipeUserId(response.user.id);
                            const verified = await EmailVerification.isEmailVerified(
                                recipeUserId,
                                response.user.emails[0]
                            );

                            if (!verified) {
                                return {
                                    status: "GENERAL_ERROR",
                                    message: "Please verify your email before logging in."
                                };
                            }
                        }
                    if (response.status !== "OK") {
                        //superTokensId: string, ipHash?: string, deviceId?: string
                        const email = input.formFields.find(f => f.id === "email")?.value;
                        // await recordAuthFailure({
                        //   email: typeof email === "string" ? email : "",
                        //   ip: input.options.req.getIP()
                        // });
                    }
                        const reqLike = stReqToRequestLike(input.options.req as BaseRequest);

                        if (response.status === "OK") {
                            await logAuthEvent({
                            req: reqLike,
                            type: AuthEventType.SIGN_IN,
                            outcome: AuthOutcome.SUCCESS,
                            superTokensId: response.user.id,
                            email: response.user.emails[0],
                            });
                        } else {
                            const email =
                            input.formFields.find((f) => f.id === "email")?.value?.toString();

                            await logAuthEvent({
                            req: reqLike,
                            type: AuthEventType.SIGN_IN_FAILED,
                            outcome: AuthOutcome.FAILURE,
                            email,
                            reasonCode: response.status,
                            });
                        }

                        return response;
                    },
                }),
            },
        }),
        EmailVerification.init({
            mode: "REQUIRED",
            emailDelivery: {
                override: (originalImplementation) => ({
                ...originalImplementation,
                sendEmail: async (input) => {

                    const verifyLink = input.emailVerifyLink;
                    const resend = new Resend(process.env.RESEND_API_KEY);

                    await resend.emails.send({
                        from: "support@forwriters.ink",
                        to: input.user.email,
                        subject: "Verify your email",
                        html: `
                            <p>Welcome to forWriters.</p>
                            <p>Please verify your email by clicking on the link:</p>
                            <a href="${verifyLink}">Verify Email</a>
                        `,
                        text: `Verify your email: ${verifyLink}`
                    });
                }
                })
            }
        }),
        Dashboard.init(),
        UserRoles.init(),
        sessionInit        
    ],
};