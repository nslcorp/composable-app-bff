import { Injectable } from '@nestjs/common';
import { ClientBuilder } from '@commercetools/sdk-client-v2';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import fetch from 'node-fetch';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';

@Injectable()
export class CommercetoolsSDK {
  api: ByProjectKeyRequestBuilder;

  constructor() {
    const projectKey = process.env.COMMERCETOOLS_PROJECT_KEY;
    const host = process.env.COMMERCETOOLS_API_URL;

    const authMiddlewareOptions = {
      host: process.env.COMMERCETOOLS_AUTH_URL,
      projectKey,
      credentials: {
        clientId: process.env.COMMERCETOOLS_CLIENT_ID,
        clientSecret: process.env.COMMERCETOOLS_CLIENT_SECRET,
      },
      scopes: [`manage_project:${projectKey}`],
      fetch,
    };

    const httpMiddlewareOptions = {
      host,
      fetch,
    };

    const ctpClient = new ClientBuilder()
      .withProjectKey(projectKey) // .withProjectKey() is not required if the projectKey is included in authMiddlewareOptions
      .withClientCredentialsFlow(authMiddlewareOptions)
      .withHttpMiddleware(httpMiddlewareOptions)
      .build();

    this.api = createApiBuilderFromCtpClient(ctpClient).withProjectKey({ projectKey });
  }
}
