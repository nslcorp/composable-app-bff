import * as dotenv from 'dotenv'
dotenv.config();

import fetch from 'node-fetch';
import {
  ClientBuilder,

  // Import middlewares
  type AuthMiddlewareOptions, // Required for auth
  type HttpMiddlewareOptions, // Required for sending HTTP requests
} from '@commercetools/sdk-client-v2';
import { createApiBuilderFromCtpClient } from "@commercetools/platform-sdk";
import * as process from "process";

const projectKey = process.env.COMMERCETOOLS_PROJECT_KEY;
const host = process.env.COMMERCETOOLS_API_URL;


const authMiddlewareOptions = {
  host: process.env.COMMERCETOOLS_AUTH_URL,
  projectKey,
  credentials: {
    clientId: process.env.COMMERCETOOLS_CLIENT_ID,
    clientSecret: process.env.COMMERCETOOLS_CLIENT_SECRET,
  },
  // oauthUri: '/oauth/token', // - optional: custom oauthUri
  scopes: [`manage_project:sn-commerce view_audit_log:sn-commerce manage_api_clients:sn-commerce view_api_clients:sn-commerce`],
  fetch,
};

const httpMiddlewareOptions = {
  host,
  fetch,
};

// Export the ClientBuilder
export const ctpClient = new ClientBuilder()
  .withProjectKey(projectKey) // .withProjectKey() is not required if the projectKey is included in authMiddlewareOptions
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .build();

const apiRoot = createApiBuilderFromCtpClient(ctpClient)
  .withProjectKey({ projectKey });


(async () => {
  try {
    const products = await apiRoot.categories().get().execute();
    console.log(products);

  }catch (error){
    console.log(error);
  }
})();




//@Injectable()
// export class CommerceToolsClient extends CommerceEngineBase {
//   private ctClient: Client;
//   private apiRoot: ApiRoot;
//   private projectKey: string;
//   constructor() {
//     super();
//     const {
//       COMMERCETOOLS_CLIENT_ID,
//       COMMERCETOOLS_SECRET,
//       COMMERCETOOLS_PROJECT_KEY,
//       COMMERCETOOLS_API_URL,
//       COMMERCETOOLS_AUTH_URL,
//       COMMERCETOOLS_SCOPE,
//     } = process.env;
//
//     this.projectKey = COMMERCETOOLS_PROJECT_KEY;
//
//     const authMiddlewareOptions: AuthMiddlewareOptions = {
//       host: COMMERCETOOLS_AUTH_URL,
//       projectKey: COMMERCETOOLS_PROJECT_KEY,
//       credentials: {
//         clientId: COMMERCETOOLS_CLIENT_ID,
//         clientSecret: COMMERCETOOLS_SECRET,
//       },
//       scopes: [COMMERCETOOLS_SCOPE],
//       fetch,
//     };
//
//     const httpMiddlewareOptions: HttpMiddlewareOptions = {
//       host: COMMERCETOOLS_API_URL,
//       fetch,
//     };
//
//     this.ctClient = new ClientBuilder()
//       .withProjectKey(COMMERCETOOLS_PROJECT_KEY)
//       .withClientCredentialsFlow(authMiddlewareOptions)
//       .withHttpMiddleware(httpMiddlewareOptions)
//       .withLoggerMiddleware()
//       .build();
//
//     this.apiRoot = createApiBuilderFromCtpClient(this.ctClient);
//   }
//
//   public async getCategories(): Promise<Category[]> {
//     return this.apiRoot
//       .withProjectKey({ projectKey: this.projectKey })
//       .categories()
//       .get()
//       .execute()
//       .then((response) => response.body.results.map(mapSingleCategoryCT));
//   }
// }
