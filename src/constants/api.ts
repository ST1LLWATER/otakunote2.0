import { GraphQLClient } from 'graphql-request';
import { RequestInit } from 'graphql-request/dist/types.dom';

const ENDPOINT = 'https://graphql.anilist.co';
export const abortController = new AbortController();

export const client = new GraphQLClient(ENDPOINT, {
  method: 'POST',
  jsonSerializer: {
    parse: JSON.parse,
    stringify: JSON.stringify,
  },
  signal: abortController.signal as NonNullable<RequestInit['signal']>,
});

export const requestHeaders = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};
