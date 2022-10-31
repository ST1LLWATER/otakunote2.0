import { gql } from 'graphql-request';

export const SEARCH_QUERY = gql`
  query (
    $page: Int = 1
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
    Page(page: $page, perPage: 50) {
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
          large
        }
        bannerImage
        startDate {
          year
          month
          day
        }
        status
        description
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

export const RECOMMENDATION_QUERY = gql`
  query ($page: Int = 1) {
    GenreCollection
    Page(page: $page, perPage: 50) {
      pageInfo {
        total
        perPage
        currentPage
        lastPage
        hasNextPage
      }
      recommendations(sort: RATING_DESC, mediaId: 20698) {
        mediaRecommendation {
          title {
            romaji
            english
            native
            userPreferred
          }
          description
        }
      }
    }
  }
`;
