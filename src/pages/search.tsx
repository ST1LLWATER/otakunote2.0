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
import { ActionIcon, Button, createStyles } from '@mantine/core';
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
      flexDirection: 'column',
    },
  },

  inputs: {
    position: 'relative',
    zIndex: 2,
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

const Search: NextPage = () => {
  const [searchedAnimes, setSearchedAnimes] = useState<AnimeInterface[] | null>(
    null
  );
  const [formData, setFormData] = useState<FormInput>({
    type: '',
    search_query: '',
    sort: '',
  });
  const [loading, setLoading] = useAtom(loadingAtom);
  const { classes, cx } = useStyles();

  useEffect(() => {
    const url_query_length = Object.keys(Router.query).length;
    if (!url_query_length) return;
    const variables: Partial<FormInput> = {
      search_query: Router.query.search_query as string,
      type: Router.query.type as string,
      sort: Router.query.sort as string,
    };
    getData(variables);
    setFormData({
      search_query: Router.query.search_query as string,
      type: Router.query.type as string,
      sort: Router.query.sort as string,
    });
  }, []);

  const handleSearch = async () => {
    if (
      formData.search_query === '' ||
      formData.type === '' ||
      formData.sort === ''
    )
      return toast.error('Please search something');

    let variables: Partial<FormInput> = {
      search_query: Router.query.search_query as string,
      type: Router.query.type as string,
      sort: Router.query.sort as string,
    };
    if (JSON.stringify(variables) === JSON.stringify(formData)) {
      return;
    }

    variables = {
      search_query: formData.search_query,
      type: formData.type,
      sort: formData.sort,
    };

    Router.push({
      pathname: '/search',
      query: variables,
    });

    getData(variables);
  };

  const getData = async (variables: any) => {
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

  // const handleSearch: () => void = async () => {
  //   let variables: Partial<FormInput> = {};
  //   const url_query = Object.keys(Router.query).length;
  //   if (url_query) {
  //     if (formData.search_query) {
  //       variables = Router.query;
  //       if (JSON.stringify(variables) === JSON.stringify(formData)) {
  //         return;
  //       } else {
  //         variables = {
  //           type: formData.type,
  //           search_query: formData.search_query,
  //           sort: formData.sort,
  //         };
  //       }
  //     }
  //   } else {
  //     variables = {
  //       type: formData.type,
  //       search_query: formData.search_query,
  //       sort: formData.sort,
  //     };
  //   }

  //   Router.push({
  //     pathname: '/search',
  //     query: variables,
  //   });

  //   if (!url_query) return;

  //   if (variables.type === 'All') {
  //     variables = {
  //       search_query: variables.search_query,
  //       sort: variables.sort,
  //     };
  //   }

  //   try {
  //     const data = await client.request<APIInterface>(
  //       SEARCH_QUERY,
  //       variables,
  //       requestHeaders
  //     );
  //     setSearchedAnimes(data.Page.media);
  //   } catch (err) {
  //     console.log(err);
  //     toast.error('Failed to fetch results');
  //   }
  // };

  if (loading) {
    return <>Loading</>;
  }

  return (
    <>
      <form onSubmit={handleSearch} className={classes.formWrapper}>
        <div className={classes.inputs}>
          <Inputs formData={formData} setFormData={setFormData} />
        </div>

        <div>
          {/* <ActionIcon
            onClick={() => handleSearch()}
            size={32}
            radius="xl"
            variant="filled"
          >
            <BsArrowRight size={18} />
          </ActionIcon> */}

          <Button
            onClick={() => handleSearch()}
            color="violet"
            variant="filled"
            size="sm"
            // rightIcon={<BsArrowRight size={18} />}
          >
            Search
          </Button>
        </div>
      </form>
      <CardWrapper animes={searchedAnimes} />
    </>
  );
};

export default Search;
