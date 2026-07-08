import { useQuery } from "@tanstack/react-query";
import { fetchUser, fetchRepos, fetchEvents } from "./github-rest";
import { fetchContributionCalendar, fetchPinnedRepos } from "./github-graphql";

export const useGithubUser = () => {
  return useQuery({
    queryKey: ["github-user"],
    queryFn: fetchUser,
    staleTime: 1000 * 60 * 5,
  });
};

export const useGithubRepos = () => {
  return useQuery({
    queryKey: ["github-repos"],
    queryFn: fetchRepos,
    staleTime: 1000 * 60 * 5,
  });
};

export const useGithubEvents = () => {
  return useQuery({
    queryKey: ["github-events"],
    queryFn: fetchEvents,
    staleTime: 1000 * 60 * 5,
  });
};

export const useGithubContributions = () => {
  return useQuery({
    queryKey: ["github-contributions"],
    queryFn: fetchContributionCalendar,
    staleTime: 1000 * 60 * 60,
    retry: false,
  });
};

export const useGithubPinnedRepos = () => {
  return useQuery({
    queryKey: ["github-pinned-repos"],
    queryFn: fetchPinnedRepos,
    staleTime: 1000 * 60 * 60,
    retry: false,
  });
};
