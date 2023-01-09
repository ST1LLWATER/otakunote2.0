import { createRouter } from './context';
import { z } from 'zod';

export const watchlistRouter = createRouter()
  .mutation('add-media', {
    input: z.object({
      mediaId: z.number(),
      mediaType: z.enum(['ANIME', 'MANGA']),
    }),
    async resolve({ ctx, input }) {
      const { mediaId, mediaType } = input;
      const userId = ctx.session?.user?.id;
      if (!userId) {
        return {
          success: false,
          message: 'Not logged in',
        };
      } else {
        const existing = await ctx.prisma.watchlist.findFirst({
          where: {
            userId,
            mediaId,
          },
        });
        if (existing) {
          return {
            success: false,
            message: 'Already in watchlist',
          };
        } else {
          const newWatchlist = await ctx.prisma.watchlist.create({
            data: {
              userId,
              mediaId,
              mediaType,
            },
          });
          return {
            success: true,
            message: 'Added to watchlist',
            watchlist: newWatchlist,
          };
        }
      }
    },
  })
  .query('get-media-by-userid', {
    input: z
      .object({
        userId: z.string(),
      })
      .optional(),
    async resolve({ ctx, input }) {
      const userId = input?.userId ?? ctx.session?.user?.id;
      if (!userId) {
        return {
          success: false,
          message: 'Invalid User ID',
        };
      } else {
        const watchlist = await ctx.prisma.watchlist.findMany({
          where: {
            userId,
          },
          select: {
            mediaId: true,
          },
        });

        const mediaIds = watchlist.map((media) => media.mediaId);
        return {
          success: true,
          message: 'Watchlist retrieved',
          watchlist: mediaIds,
        };
      }
    },
  });
