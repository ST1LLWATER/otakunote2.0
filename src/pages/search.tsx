import React, { useEffect, useState } from 'react';
import { request } from 'graphql-request';
import { GraphQLClient } from 'graphql-request';
import ENDPOINT from '../constants/api';
import { SEARCH_QUERY } from '../queries/gql_queries.gql';
import { InputWithFilter } from '../components/search/Input';
import CardWrapper from '../components/global/CardWrapper';
import { atom, useAtom } from 'jotai';
import { CardInterface } from '../interfaces/CardInterface';
import { APIInterface } from '../interfaces/APIInterface';

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
    let variables: {
      type?: string;
      search_query: string;
      sort: string;
    };
    if (type === 'All') {
      variables = {
        search_query,
        sort,
      };
    } else {
      variables = {
        search_query,
        sort,
        type,
      };
    }

    try {
      const data = await client.request<APIInterface>(
        query,
        variables,
        requestHeaders
      );
      console.log(data);
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
