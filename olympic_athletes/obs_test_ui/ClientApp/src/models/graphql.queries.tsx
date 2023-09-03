import { gql } from '@apollo/client';

export const GET_GAMES = {
  query: gql`
    query GetGames {
      games {
        gameId
        city
        year
      }
    }
  `,
  queryNode: 'games',
};

export const GET_PAGED_ATHLETES = {
  query: gql`
    query GetPagesAthletes($id: ID, $first: Int, $after: String) {
      athletes(id: $id, first: $first, after: $after) {
        edges {
          node {
            athleteId
            fullName
            globalScore
            photo {
              mimeType
              blob
            }
          }
        }
        pageInfo {
          hasNextPage
        }
        totalCount
      }
    }
  `,
  queryNode: 'athletes',
};
export const GET_ATHLETE_BY_ID = {
  query: gql`
    query GetAthlete($id: ID) {
      athlete(id: $id) {
        athleteId
        name
        surname
        dateOfBirth
        height
        weight
        bio
        photo {
          mimeType
          blob
        }
        athleteResults {
          gold
          silver
          bronze
          game {
            city
            year
          }
        }
      }
    }
  `,
  queryNode: 'games',
};
