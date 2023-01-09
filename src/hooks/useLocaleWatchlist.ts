import { APIInterface } from './../interfaces/APIInterface';
import { client } from './../constants/api';
import { requestHeaders } from '../constants/api';
import { SEARCH_QUERY } from '../queries/gql_queries.gql';

export const setLocaleWatchlist = async (data: any) => {
  const variables = {
    id_in: data.watchlist,
  };
  const res = await client.request<APIInterface>(
    SEARCH_QUERY,
    variables,
    requestHeaders
  );

  return res.Page.media;
};
