import { trpc } from '../utils/trpc';
import { WatchListPayload } from '../components/ActionButtons';
import toast from 'react-hot-toast';

export const addAnimeToWatchlist = async ({
  mediaId,
  mediaType,
}: WatchListPayload) => {
  const mutation = trpc.useMutation('watchlist.add-media');
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
    }
  );
};
