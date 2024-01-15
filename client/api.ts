'use client';

import { GraphQLClient } from 'graphql-request';

const isClient = typeof window !== 'undefined';

export const GraphQL = new GraphQLClient(
  process.env.NEXT_PUBLIC_SERVER_URL as string,
  {
    headers: {
      Authorization: `Bearer ${
        isClient ? window.localStorage.getItem('__hashtag_token') : ''
      }`,
    },
  }
);
