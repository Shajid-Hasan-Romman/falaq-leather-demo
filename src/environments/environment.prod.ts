import { Environment } from './environment.interface';

// Production environment. Same-origin by default — a reverse proxy (nginx)
// is expected to forward `/api/*` to the API service, so call sites build
// relative URLs and cookies ride automatically without CORS.
export const environment: Environment = {
  production: true,
  apiBaseUrl: '',
  imageBaseUrl: '',
};
