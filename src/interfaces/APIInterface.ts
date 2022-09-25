import { CardInterface } from './CardInterface';

export interface APIInterface {
  Page: {
    media: CardInterface[];
    pageInfo: {
      currentPage: number;
      hasNextPage: boolean;
      lastPage: number;
      perPage: number;
      total: number;
    };
  };
}
