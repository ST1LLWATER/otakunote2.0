import { Button } from '@mantine/core';
import { BsPlus } from 'react-icons/bs';
import { FaRegTrashAlt } from 'react-icons/fa';
import toast from 'react-hot-toast';
// import { addAnimeToWatchlist } from '../../functions/miscFunctions';
import { trpc } from '../utils/trpc';
import { addAnimeToWatchlist } from '../functions/miscFunctions';

export type WatchListPayload = {
  isLoggedIn: boolean;
  mediaId: number;
  mediaType: 'ANIME' | 'MANGA';
  mutation?: any;
};

export const WATCHLIST_BUTTON = ({
  isLoggedIn,
  mediaId,
  mediaType,
}: WatchListPayload) => {
  const mutation = trpc.useMutation('watchlist.add-media');

  return (
    <Button
      styles={() => ({
        root: {
          padding: '4px 8px',
          width: '50%',
        },
        rightIcon: {
          margin: '0',
          fontSize: '20px',
        },

        '&:focus': {
          outline: 0,
        },
      })}
      onClick={() =>
        addAnimeToWatchlist({
          mediaId,
          mediaType,
          isLoggedIn,
          mutation,
        })
      }
      variant="filled"
      size="sm"
      color="violet"
      rightIcon={<BsPlus />}
    >
      <p>Watchlist</p>
    </Button>
  );
};

export const REMOVE_BUTTON = ({ mediaId }: { mediaId: number }) => (
  <Button
    styles={(theme) => ({
      root: {
        padding: '4px 8px',
        width: '50%',
        background: '#A85442',

        '&:hover': {
          background: '#864335',
        },

        '&:focus': {
          outline: 0,
        },
      },
      rightIcon: {
        margin: '0 0 1px 4px',
        fontSize: '14px',
      },
    })}
    variant="filled"
    size="sm"
    rightIcon={<FaRegTrashAlt />}
  >
    <p>Remove</p>
  </Button>
);
