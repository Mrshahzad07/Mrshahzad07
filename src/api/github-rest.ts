import { GITHUB_USERNAME, REST_API_BASE, getFetchOptions } from "@/lib/constants";
import { GitHubUser, GitHubRepo, GitHubEvent } from "@/types/github";

export const fetchUser = async (): Promise<GitHubUser> => {
  const res = await fetch(`${REST_API_BASE}/users/${GITHUB_USERNAME}`, getFetchOptions());
  if (!res.ok) throw new Error("Failed to fetch user");
  return res.json();
};

export const fetchRepos = async (): Promise<GitHubRepo[]> => {
  const res = await fetch(`${REST_API_BASE}/users/${GITHUB_USERNAME}/repos?per_page=100&sort=pushed`, getFetchOptions());
  if (!res.ok) throw new Error("Failed to fetch repos");
  return res.json();
};

export const fetchEvents = async (): Promise<GitHubEvent[]> => {
  const res = await fetch(`${REST_API_BASE}/users/${GITHUB_USERNAME}/events/public?per_page=30`, getFetchOptions());
  if (!res.ok) throw new Error("Failed to fetch events");
  return res.json();
};
