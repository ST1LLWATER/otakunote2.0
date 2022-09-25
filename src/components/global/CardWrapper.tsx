import React from 'react';
import Card from './Card';
import { useAtomValue } from 'jotai';
import { searchedAnimeAtom } from '../../pages/search';
import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  wrapper: {
    display: 'grid',
    // gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gridTemplateColumns: `repeat(5,1fr)`,
    placeItems: 'center',
    gap: '32px',
    margin: '0 10px',

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

const CardWrapper = () => {
  const searchedAnimes = useAtomValue(searchedAnimeAtom);
  const { classes, cx } = useStyles();
  return (
    <div className={classes.wrapper}>
      {searchedAnimes?.map((anime) => (
        <Card key={anime.id} anime={anime} watchlisted />
      ))}
    </div>
  );
};

export default CardWrapper;
