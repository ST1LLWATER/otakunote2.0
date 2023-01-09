import React, { useEffect } from 'react';
import { trpc } from '../../utils/trpc';
import { setLocaleWatchlist } from '../../hooks/useLocaleWatchlist';
import CardWrapper from '../../components/global/CardWrapper';
import { useAtom } from 'jotai';
import { renderAnimesAtom } from '../../store/animeStore';

const Watchlist = () => {
  const [, setRenderAnimes] = useAtom(renderAnimesAtom);
  trpc.useQuery(['watchlist.get-media-by-userid'], {
    onSuccess: async (data) => {
      let animeData = await setLocaleWatchlist(data);
      setRenderAnimes(animeData);
    },
  });
  // console.log({ data, status });

  return (
    <>
      <CardWrapper />
    </>
  );
};

export default Watchlist;
