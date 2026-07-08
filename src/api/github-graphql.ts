import { GraphQLClient, gql } from "graphql-request";
import { GITHUB_USERNAME, GRAPHQL_API_BASE, GITHUB_TOKEN } from "@/lib/constants";

const client = new GraphQLClient(GRAPHQL_API_BASE, {
  headers: GITHUB_TOKEN ? {
    authorization: `Bearer ${GITHUB_TOKEN}`,
  } : {},
});

export const fetchContributionCalendar = async () => {
  if (!GITHUB_TOKEN) {
    throw new Error("GitHub token is required for GraphQL API");
  }

  const query = gql`
    query($userName: String!) {
      user(login: $userName) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
                color
              }
            }
          }
        }
      }
    }
  `;

  const data = await client.request<any>(query, { userName: GITHUB_USERNAME });
  return data.user.contributionsCollection.contributionCalendar;
};

export const fetchPinnedRepos = async () => {
  if (!GITHUB_TOKEN) {
     return [];
  }

  const query = gql`
    query($userName: String!) {
      user(login: $userName) {
        pinnedItems(first: 6, types: REPOSITORY) {
          nodes {
            ... on Repository {
              id
              name
              description
              url
              stargazerCount
              forkCount
              primaryLanguage {
                name
                color
              }
            }
          }
        }
      }
    }
  `;

  const data = await client.request<any>(query, { userName: GITHUB_USERNAME });
  return data.user.pinnedItems.nodes;
};
