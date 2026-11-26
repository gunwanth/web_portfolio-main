// Query-based page addresses also work on static hosts without a rewrite rule.
export function spaceUrl(spaceId, section = "") {
  const search = new URLSearchParams({ space: spaceId });
  return `?${search}${section ? "#" + section : ""}`;
}
