import { APIInterface } from '../interfaces/APIInterface';
import { client } from '../constants/api';
import { requestHeaders } from '../constants/api';
import { SEARCH_QUERY } from '../queries/gql_queries.gql';
import { trpc } from '../utils/trpc';
import { ConstantData } from '../constants/filter_data';

export const getWatchlist = async () => {
  const { data } = trpc.useQuery(['watchlist.get-media-by-userid']);

  if (!data) return null;
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

export const getCalendar = async ({ setOngoing }: any) => {
  const variables = {
    type: 'ANIME',
    season: Object.entries(ConstantData.Season).find(([_, value]) =>
      value.includes(new Date().toLocaleString('default', { month: 'long' }))
    )![0],
    seasonYear: new Date().getFullYear(),
  };

  const data = await client.request<APIInterface>(
    SEARCH_QUERY,
    variables,
    requestHeaders
  );

  console.log(data.Page.media);

  setOngoing(data.Page.media);
};
