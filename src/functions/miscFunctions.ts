import { trpc } from '../utils/trpc';
import { WatchListPayload } from '../components/ActionButtons';
import toast from 'react-hot-toast';

export const addAnimeToWatchlist = async ({
  mediaId,
  mediaType,
  isLoggedIn,
  mutation,
}: WatchListPayload) => {
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
};
