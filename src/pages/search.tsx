import React, { useEffect, useState } from 'react';
import { client, requestHeaders } from '../constants/api';
import { SEARCH_QUERY } from '../queries/gql_queries.gql';
import Inputs from '../components/search/Inputs';
import CardWrapper from '../components/global/CardWrapper';
import { useAtom } from 'jotai';
import { APIInterface } from '../interfaces/APIInterface';
import Router from 'next/router';
import { NextPage } from 'next';
import { loadingAtom } from '../store';
import { toast } from 'react-hot-toast';
import { AnimeInterface } from '../interfaces/AnimeInterface';
import { ActionIcon, createStyles } from '@mantine/core';
import { BsArrowRight } from 'react-icons/bs';

const useStyles = createStyles((theme) => ({
  formWrapper: {
    display: 'flex',
    maxWidth: '70%',
    position: 'relative',
    zIndex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
    margin: '30px auto',

    [theme.fn.smallerThan('md')]: {
      maxWidth: '95%',
    },
  },

  inputs: {
    flex: 1,
  },
}));

interface Props {
  query:
    | {
        type: string;
        search_query: string;
        sort: string;
      }
    | Record<string, never>;
}

export type FormInput = {
  type: string | undefined;
  search_query: string | undefined;
  sort: string | undefined;
};

const Search: NextPage<Props> = ({ query }) => {
  const [searchedAnimes, setSearchedAnimes] = useState<AnimeInterface[] | null>(
    null
  );
  const [formData, setFormData] = useState<FormInput>({
    type: undefined,
    search_query: undefined,
    sort: undefined,
  });
  const [loading, setLoading] = useAtom(loadingAtom);
  const { classes, cx } = useStyles();

  // const client = new GraphQLClient(ENDPOINT, {
  //   method: 'POST',
  //   jsonSerializer: {
  //     parse: JSON.parse,
  //     stringify: JSON.stringify,
  //   },
  // });

  useEffect(() => {
    handleSearch();
  }, []);

  // const api_query = SEARCH_QUERY;

  // const requestHeaders = {
  //   'Content-Type': 'application/json',
  //   Accept: 'application/json',
  // };

  const handleSearch: () => void = async () => {
    let variables: Partial<FormInput> = {};
    const url_query = Object.keys(Router.query).length;
    if (url_query) {
      if (formData.search_query) {
        variables = Router.query;
        if (JSON.stringify(variables) === JSON.stringify(formData)) {
          console.log('INPUT IS SAME RETURNING');
          return;
        } else {
          variables = {
            type: formData.type,
            search_query: formData.search_query,
            sort: formData.sort,
          };
        }
      }
    } else {
      variables = {
        type: formData.type,
        search_query: formData.search_query,
        sort: formData.sort,
      };
    }

    console.log(variables);

    Router.push({
      pathname: '/search',
      query: variables,
    });

    if (!url_query) return;
    // const searchParams = {
    //   type: formData.type,
    //   search_query: formData.search_query,
    //   sort: formData.sort,
    // };

    if (variables.type === 'All') {
      variables = {
        search_query: variables.search_query,
        sort: variables.sort,
      };
    }
    // else {
    //   variables = {
    //     search_query,
    //     sort,
    //     type,
    //   };
    // }

    try {
      const data = await client.request<APIInterface>(
        SEARCH_QUERY,
        variables,
        requestHeaders
      );
      setSearchedAnimes(data.Page.media);
    } catch (err) {
      console.log(err);
      toast.error('Failed to fetch results');
    }
  };

  if (loading) {
    return <>Loading</>;
  }

  return (
    <>
      <form onSubmit={handleSearch} className={classes.formWrapper}>
        <div className={classes.inputs}>
          <Inputs formData={formData} setFormData={setFormData} />
        </div>

        <ActionIcon
          onClick={() => handleSearch()}
          size={32}
          radius="xl"
          variant="filled"
        >
          <BsArrowRight size={18} />
        </ActionIcon>
      </form>
      <CardWrapper animes={searchedAnimes} />
    </>
  );
};

export async function getServerSideProps({ query }: Props) {
  return {
    props: { query },
  };
}

export default Search;
