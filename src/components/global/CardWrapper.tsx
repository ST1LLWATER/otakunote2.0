import React from 'react';
import Card from '../data/Card';
import { createStyles } from '@mantine/core';
import { useUser } from '../../hooks/useUser';
import { CardInterface } from '../../interfaces/CardInterface';
import { watchlistedIdsAtom } from '../../store';
import { useAtom } from 'jotai';

const useStyles = createStyles((theme) => ({
  wrapper: {
    display: 'grid',
    position: 'relative',
    zIndex: 1,
    // gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gridTemplateColumns: `repeat(5,1fr)`,
    placeItems: 'center',
    gap: '32px',
    // margin: '30px 10px',

    [theme.fn.smallerThan('lg')]: {
      gridTemplateColumns: `repeat(4,1fr)`,
    },

    [theme.fn.smallerThan('md')]: {
      gridTemplateColumns: `repeat(3,1fr)`,
    },

    [theme.fn.smallerThan('sm')]: {
      margin: '0 30px',
      gridTemplateColumns: `repeat(1,1fr)`,
    },
  },
}));

interface CardWrapperProps {
  animes: CardInterface[] | null;
}

const CardWrapper = (props: CardWrapperProps) => {
  const { classes, cx } = useStyles();
  const [watchlistedIds, setWatchlistedIds] = useAtom(watchlistedIdsAtom);
  const isLoggedIn = useUser();
  return (
    <>
      <div className={classes.wrapper}>
        {props.animes?.map((anime) => (
          <Card
            key={anime.id}
            isLoggedIn={isLoggedIn}
            anime={anime}
            watchlisted={watchlistedIds?.includes(anime.id) ? true : false}
          />
        ))}
      </div>
    </>
  );
};

export default CardWrapper;
