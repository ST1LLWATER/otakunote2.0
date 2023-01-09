// src/server/router/index.ts
import { createRouter } from './context';
import superjson from 'superjson';

import { watchlistRouter } from './watchlist';

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('watchlist.', watchlistRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
