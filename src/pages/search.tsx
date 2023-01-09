import React, { useEffect } from 'react';
import { client, requestHeaders } from '../constants/api';
import { SEARCH_QUERY } from '../queries/gql_queries.gql';
import { InputWithFilter } from '../components/search/Input';
import CardWrapper from '../components/global/CardWrapper';
import { useAtom } from 'jotai';
import { APIInterface } from '../interfaces/APIInterface';
import Router from 'next/router';
import { NextPage } from 'next';
import { renderAnimesAtom } from '../store/animeStore';

interface Props {
  query:
    | {
        type: string;
        search_query: string;
        sort: string;
      }
    | Record<string, never>;
}

const Search: NextPage<Props> = ({ query }) => {
  const [searchResults, setSearchResults] = useAtom(renderAnimesAtom);

  // const client = new GraphQLClient(ENDPOINT, {
  //   method: 'POST',
  //   jsonSerializer: {
  //     parse: JSON.parse,
  //     stringify: JSON.stringify,
  //   },
  // });

  useEffect(() => {
    if (Object.keys(query).length === 0) return;
    handleSearch(query.type, query.search_query, query.sort);
  }, []);

  // const api_query = SEARCH_QUERY;

  // const requestHeaders = {
  //   'Content-Type': 'application/json',
  //   Accept: 'application/json',
  // };

  const handleSearch = async (
    type: string,
    search_query: string,
    sort: string
  ) => {
    const searchParams = {
      type: type,
      search_query: search_query,
      sort: sort,
    };

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

    Router.push({
      pathname: '/search',
      query: searchParams,
    });

    try {
      const data = await client.request<APIInterface>(
        SEARCH_QUERY,
        variables,
        requestHeaders
      );
      setSearchResults(data.Page.media);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <InputWithFilter handleSearch={handleSearch} />
      <CardWrapper />
    </>
  );
};

export async function getServerSideProps({ query }: Props) {
  return {
    props: { query },
  };
}

export default Search;
