import React, { useEffect, useState } from 'react';
import { request } from 'graphql-request';
import { GraphQLClient } from 'graphql-request';
import ENDPOINT from '../constants/api';
import { SEARCH_QUERY } from '../queries/gql_queries.gql';
import { InputWithFilter } from '../components/search/Input';
import Card from '../components/global/Card';
import CardWrapper from '../components/global/CardWrapper';
import { atom, useAtom } from 'jotai';
import { CardInterface } from '../interfaces/CardInterface';

export const searchedAnimeAtom = atom<CardInterface[] | null>(null);

const Search = () => {
  const [searchResults, setSearchResults] = useAtom(searchedAnimeAtom);

  const client = new GraphQLClient(ENDPOINT, {
    method: 'POST',
    jsonSerializer: {
      parse: JSON.parse,
      stringify: JSON.stringify,
    },
  });

  const query = SEARCH_QUERY;

  const requestHeaders = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  async function handleSubmit(
    type: string,
    search_query: string,
    sort: string
  ) {
    let variables;
    if (type === 'All') {
      variables = {
        search_query,
        sort,
      };
    } else {
      variables = {
        type,
        search_query,
        sort,
      };
    }
    try {
      const data = await client.request(query, variables, requestHeaders);
      setSearchResults(data.Page.media);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <InputWithFilter handleSubmit={handleSubmit} />
      <CardWrapper />
    </>
  );
};

export default Search;
