import { AnimeInterface } from './AnimeInterface';

export interface APIInterface {
  Page: {
    media: AnimeInterface[];
    pageInfo: {
      currentPage: number;
      hasNextPage: boolean;
      lastPage: number;
      perPage: number;
      total: number;
    };
  };
}
