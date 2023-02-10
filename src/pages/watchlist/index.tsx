import React, { useEffect, useState } from 'react';
import { trpc } from '../../utils/trpc';
import CardWrapper from '../../components/global/CardWrapper';
import { useAtom } from 'jotai';
import { CardInterface } from '../../interfaces/CardInterface';
import { watchlistedAnimesAtom, watchlistedIdsAtom } from '../../store';
import { useSession } from 'next-auth/react';
import { getWatchlist } from '../../functions/dataFetcherFunctions';

const Watchlist = () => {
  const { data: session } = useSession();
  const [watchlistedIds, setWatchlistedIds] = useAtom(watchlistedIdsAtom);
  const [watchlistedAnimes, setWatchlistedAnimes] = useAtom(
    watchlistedAnimesAtom
  );
  trpc.useQuery(['watchlist.get-media-by-userid'], {
    enabled: watchlistedIds ? false : true && session !== null,
    onSuccess: (data) => {
      setWatchlistedIds(data.watchlist);
    },
  });

  useEffect(() => {
    if (watchlistedAnimes != null) return;
    getWatchlist({ watchlistedIds, setWatchlistedAnimes });
  }, [watchlistedIds]);

  return (
    <>
      <CardWrapper animes={watchlistedAnimes} />
    </>
  );
};

export default Watchlist;
