export interface Environment {
  /** True in the production build (see angular.json fileReplacements). */
  production: boolean;
  /**
   * API origin. Empty string = same-origin relative URLs (`/api/v1/...`),
   * which is what the dev proxy (proxy.conf.json) and a same-origin nginx
   * deploy both expect. Set an absolute origin only for cross-origin setups.
   */
  apiBaseUrl: string;
  /** CDN/base URL for product & content images. */
  imageBaseUrl: string;
}
