# Generated API client

This folder is **auto-generated** by [`ng-openapi-gen`](https://github.com/cyclosproject/ng-openapi-gen)
from the backend's OpenAPI spec. Do not edit files here by hand — they are
overwritten on every regeneration.

## Regenerate

Once the v2.0 backend exists and is running:

```bash
npm run generate:api   # reads ng-openapi-gen.json → writes services + models here
```

`ng-openapi-gen.json` points at `http://localhost:5199/openapi/v1.json` and needs
`includeTags` populated with the API's storefront tag names before the first run.

Until the backend lands, this folder stays empty except for this README. Feature
services should call the generated functions here — **no manual DTOs, no raw
`HttpClient` URL strings** (see `CLAUDE.md`).
