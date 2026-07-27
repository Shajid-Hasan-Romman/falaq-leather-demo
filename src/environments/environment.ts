import { Environment } from './environment.interface';

// Development environment. `apiBaseUrl: ''` produces relative `/api/v1/...`
// URLs that the dev-server proxy (proxy.conf.json) forwards to the local API.
export const environment: Environment = {
  production: false,
  apiBaseUrl: '',
  imageBaseUrl: '',
};
