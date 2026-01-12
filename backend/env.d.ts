declare namespace NodeJS {
    interface ProcessEnv {
        NODE_ENV: string;
        DATABASE_URL: string;
        SUPERTOKENS_CONNECTION_URI: string;
        SUPERTOKENS_API_KEY: string;
        APP_NAME: string;
        API_DOMAIN: string;
        WEBSITE_DOMAIN: string;
        WEB_HOST: string;
        WEB_PORT: number;
        API_HOST: string;
        API_PORT: number;
        PORT: string;
    }
}