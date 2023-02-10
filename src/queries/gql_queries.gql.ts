import { gql } from 'graphql-request';

export const SEARCH_QUERY = gql`
  query (
    $page: Int = 1
    $perPage: Int = 15
    $type: MediaType
    $search_query: String
    $id_in: [Int]
    $idMal_in: [Int]
    $season: MediaSeason
    $isAdult: Boolean
    $genres: [String]
    $seasonYear: Int
    $sort: [MediaSort] = [POPULARITY_DESC]
  ) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        perPage
        currentPage
        lastPage
        hasNextPage
      }
      media(
        type: $type
        search: $search_query
        id_in: $id_in
        idMal_in: $idMal_in
        season: $season
        seasonYear: $seasonYear
        genre_in: $genres
        isAdult: $isAdult
        sort: $sort
      ) {
        id
        type
        isAdult
        title {
          english
          romaji
        }
        coverImage {
          extraLarge
        }
        startDate {
          year
          month
          day
        }
        status
        episodes
        genres
        averageScore
        nextAiringEpisode {
          airingAt
          timeUntilAiring
          episode
        }
      }
    }
  }
`;

export const MODAL_QUERY = gql`
  query ($id: Int) {
    Media(id: $id) {
      title {
        english
        romaji
      }
      startDate {
        year
        month
      }
      trailer {
        id
        site
        thumbnail
      }
      characterPreview: characters(sort: [ROLE, RELEVANCE, ID]) {
        edges {
          role
          name
          node {
            id
            name {
              full
            }
            image {
              medium
            }
          }
        }
      }
      status
      description
      episodes
      bannerImage
      averageScore
      nextAiringEpisode {
        airingAt
        timeUntilAiring
        episode
      }
    }
  }
`;

export const RECOMMENDATION_QUERY = gql`
  query ($page: Int = 1, $mediaId: Int) {
    GenreCollection
    Page(page: $page, perPage: 50) {
      pageInfo {
        total
        perPage
        currentPage
        lastPage
        hasNextPage
      }
      recommendations(sort: RATING_DESC, mediaId: $mediaId) {
        mediaRecommendation {
          title {
            romaji
            english
          }
          description
        }
      }
    }
  }
`;

export interface SearchData {
  id: number;
  type: string;
  isAdult: boolean;
  title: {
    english: string;
    romaji: string;
  };
  coverImage: {
    extraLarge: string;
  };
  startDate: {
    year: number;
    month: number;
    day: number;
  };
  status: string;
  episodes?: number;
  genres: string[];
  averageScore: number;
  nextAiringEpisode: {
    airingAt: number;
    timeUntilAiring: number;
    episode: number;
  };
}
