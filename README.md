# Immobilier Frontend (Vue)

Vue 3 public frontend for the Swiss real-estate platform, inspired by [immobilier.ch](https://www.immobilier.ch/en/).
Feature-complete alternative to the React frontend.

## Stack

| Area | Technology |
|------|-----------|
| Framework | Vue 3.5 (Composition API) |
| Language | TypeScript |
| Build | Vite |
| UI | PrimeVue 4 + Tailwind CSS 4 |
| State | Pinia |
| Routing | Vue Router |
| i18n | vue-i18n (EN, FR, DE, IT) |
| Maps | Leaflet |
| Testing | Vitest + Vue Test Utils |
| E2E | Playwright |

## Quick Start

```bash
# API must be running first (creates the Docker network)
cd ../immobilier-api-node
docker compose -f docker-compose.yml -f docker-compose.dev.yml up -d

# Then start this frontend
cd ../immobilier-frontend-vue
docker compose up --build -d
```

App runs at http://localhost:5175

## Environment

Copy `.env.example` to `.env`:
```
VITE_API_BASE_URL=http://localhost:4003/api/v1
VITE_DEFAULT_LOCALE=en
```

## License

MIT
