import React, { useEffect, useState } from 'react';
import { trpc } from '../../utils/trpc';
import CardWrapper from '../../components/global/CardWrapper';
import { useAtom } from 'jotai';
import { CardInterface } from '../../interfaces/CardInterface';
import { watchlistedAnimesAtom, watchlistedIdsAtom } from '../../store';
import { useSession } from 'next-auth/react';
import { getWatchlist } from '../../functions/dataFetcherFunctions';
import { Tabs, createStyles } from '@mantine/core';

const useStyles = createStyles((theme, params, getRef) => ({
  tabs: {
    marginBottom: '20px',
  },
}));

const Watchlist = () => {
  const { data: session } = useSession();
  const [watchlistedIds, setWatchlistedIds] = useAtom(watchlistedIdsAtom);
  const [watchlistedAnimes, setWatchlistedAnimes] = useAtom(
    watchlistedAnimesAtom
  );
  const { classes } = useStyles();

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
      <div className={classes.tabs}>
        <Tabs color="teal" defaultValue="first">
          <Tabs.List>
            <Tabs.Tab value="first">All Anime</Tabs.Tab>
            <Tabs.Tab value="second" color="blue">
              Completed
            </Tabs.Tab>
            <Tabs.Tab value="third" color="blue">
              Watching
            </Tabs.Tab>
            <Tabs.Tab value="fourth" color="blue">
              Plan to Watch
            </Tabs.Tab>{' '}
            <Tabs.Tab value="fifth" color="blue">
              Dropped
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="first" pt="xl">
            <CardWrapper animes={watchlistedAnimes} />
          </Tabs.Panel>

          <Tabs.Panel value="second" pt="xl">
            Implementing Soon
          </Tabs.Panel>

          <Tabs.Panel value="third" pt="xl">
            Implementing Soon
          </Tabs.Panel>

          <Tabs.Panel value="fourth" pt="xl">
            Implementing Soon
          </Tabs.Panel>

          <Tabs.Panel value="fifth" pt="xl">
            Implementing Soon
          </Tabs.Panel>
        </Tabs>
      </div>
    </>
  );
};

export default Watchlist;
