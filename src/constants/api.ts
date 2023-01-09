import { GraphQLClient } from 'graphql-request';

const ENDPOINT = 'https://graphql.anilist.co';

export const client = new GraphQLClient(ENDPOINT, {
  method: 'POST',
  jsonSerializer: {
    parse: JSON.parse,
    stringify: JSON.stringify,
  },
});

export const requestHeaders = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};
