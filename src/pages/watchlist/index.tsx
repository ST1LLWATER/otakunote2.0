import React, { useEffect, useState } from 'react';
import { trpc } from '../../utils/trpc';
import { getWatchlist } from '../../functions/dataFetcherFunctions';
import CardWrapper from '../../components/global/CardWrapper';
import { useAtom } from 'jotai';
import { toast } from 'react-hot-toast';
import { AnimeInterface } from '../../interfaces/AnimeInterface';

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState<AnimeInterface[] | null>(null);

  return (
    <>
      <CardWrapper animes={watchlist} />
    </>
  );
};

export default Watchlist;
