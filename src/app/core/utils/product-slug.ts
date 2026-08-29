/** Extract catalog slug from `/product-details/:slug` paths. */
export function productSlugFromPath(path: string): string {
  const prefix = '/product-details/';
  if (path.startsWith(prefix)) {
    return path.slice(prefix.length);
  }
  const segments = path.split('/').filter(Boolean);
  return segments[segments.length - 1] ?? '';
}
