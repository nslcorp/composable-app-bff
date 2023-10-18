declare global {
  namespace NodeJS {
    interface ProcessEnv {
      COMMERCETOOLS_CLIENT_ID: string;
      COMMERCETOOLS_CLIENT_SECRET: string;
      COMMERCETOOLS_PROJECT_KEY: string;
      COMMERCETOOLS_API_URL: string;
      COMMERCETOOLS_AUTH_URL: string;
      COMMERCE_TOOLS_ACCESS_TOKEN: string;
      COMMERCE_TOOLS_LOCALE: string;
      NODE_DATA_PROVIDER: string;
    }
  }
}


