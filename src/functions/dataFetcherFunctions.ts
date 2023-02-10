import { APIInterface } from '../interfaces/APIInterface';
import { client } from '../constants/api';
import { requestHeaders } from '../constants/api';
import { SEARCH_QUERY, MODAL_QUERY } from '../queries/gql_queries.gql';
import { ConstantData } from '../constants/filter_data';

export const getWatchlist = async ({
  watchlistedIds,
  setWatchlistedAnimes,
}: {
  watchlistedIds: number[] | null;
  setWatchlistedAnimes: any;
}) => {
  if (watchlistedIds == null || watchlistedIds.length == 0) return null;
  const variables = {
    id_in: watchlistedIds,
  };
  const res = await client.request<APIInterface>(
    SEARCH_QUERY,
    variables,
    requestHeaders
  );

  setWatchlistedAnimes(res.Page.media);
};

export const getModalData = async ({ id }: { id: number }) => {
  const variables = {
    id: id,
  };

  const res = await client.request(MODAL_QUERY, variables, requestHeaders);

  return res.Media;
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

  setOngoing(data.Page.media);
};
