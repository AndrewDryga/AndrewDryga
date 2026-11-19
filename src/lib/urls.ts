/** Match the existing topic routes without changing their published slugs. */
export function tagSlug(tag: string): string {
  return tag.toLowerCase().replace(/\//g, "-");
}

export function tagHref(tag: string): string {
  return `/tags/${encodeURIComponent(tagSlug(tag))}/`;
}
