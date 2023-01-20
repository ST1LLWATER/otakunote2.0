import { Button } from '@mantine/core';
import { BsPlus } from 'react-icons/bs';
import { FaRegTrashAlt } from 'react-icons/fa';
import toast from 'react-hot-toast';
// import { addAnimeToWatchlist } from '../../functions/miscFunctions';
import { trpc } from '../utils/trpc';

export type WatchListPayload = {
  isLoggedIn: boolean;
  mediaId: number;
  mediaType: 'ANIME' | 'MANGA';
};

export const WATCHLIST_BUTTON = ({
  isLoggedIn,
  mediaId,
  mediaType,
}: WatchListPayload) => {
  const mutation = trpc.useMutation('watchlist.add-media');
  async function addAnimeToWatchlist({
    mediaId,
    mediaType,
    isLoggedIn,
  }: WatchListPayload) {
    if (!isLoggedIn) {
      toast.error('Please Login to Add to Watchlist');
      return;
    }
    toast.loading('Adding to watchlist...');
    if (!mediaId || !mediaType) return;
    mutation.mutate(
      {
        mediaId: mediaId,
        mediaType: mediaType,
      },
      {
        onSuccess: () => {
          toast.dismiss();
          toast.success('Added to Watchlist!');
        },
        onError: () => {
          toast.dismiss();
          toast.error('Failed to add to watchlist');
        },
      }
    );
  }

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
      onClick={async () =>
        isLoggedIn
          ? await addAnimeToWatchlist({
              mediaId,
              mediaType,
              isLoggedIn,
            })
          : toast.error('Please Login to Add to Watchlist')
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

export const REMOVE_BUTTON = () => (
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
