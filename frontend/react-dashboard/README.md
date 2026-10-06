# IoT Monitoring Dashboard

A small React 19 + TypeScript + Vite dashboard for the IoT monitoring backend. It has three pages:

- `/sensors`: lists all sensors (name and type).
- `/sensor-readings`: a form to submit a new reading (`value`, `timestamp`) for a selected sensor.
- `/alerts`: lists alerts (message, sensor, timestamp), newest first. The list refreshes automatically every 5 seconds.

## Running the app

### Prerequisites

- Node.js + npm
- Java 21
- Docker (for PostgreSQL and Kafka)

All commands below are relative to this folder (`frontend/react-dashboard`).

### 1. Start the backend

```bash
cd ../../backend
docker compose up -d
./mvnw spring-boot:run
```

The API listens on `http://localhost:8080`.

> **Note:** the backend uses `spring.jpa.hibernate.ddl-auto=create-drop`, so the database starts empty on every restart. Create a few sensors before using the dashboard:
>
> ```bash
> curl -X POST http://localhost:8080/sensors -H "Content-Type: application/json" -d '{"name":"Freezer 1","type":"TEMPERATURE"}'
> ```
>
> Valid types: `TEMPERATURE`, `HUMIDITY`, `ATMOSPHERIC_PRESSURE`.

### 2. Start the frontend

`spring-boot:run` keeps the first terminal busy, so open a second one in this folder:

```bash
npm install
npm run dev
```

Open `http://localhost:5173`. The dev server forwards `/api/*` calls to the backend (see below).

### 3. Run the tests

```bash
npm test
```

Other useful scripts: `npm run build` (type check + production build) and `npm run lint` (oxlint).

## Architecture

```
src/
├── sensors/            sensorApi (HTTP) → useSensors (state) → Sensors page + SensorTable (presentational)
├── alerts/             alertApi  (HTTP) → useAlerts  (state) → Alerts page  + AlertTable  (presentational)
└── sensor-readings/    sensorReadingApi (HTTP) → SensorReadings page (form)
```

## Decisions

**Dev proxy instead of CORS.** `vite.config.ts` forwards `/api/*` to `http://localhost:8080`. 
This way the backend doesn't need a `CorsConfig` that allows the dev server's origin, and the frontend and backend stay independent of each other.

**`/api` prefix, stripped by the proxy.** The React routes and the backend endpoints share the same paths (`/sensors`).
If the proxy forwarded `/sensors` directly, refreshing the browser on `localhost:5173/sensors` would return the backend's JSON instead of `index.html`. 
The `/api` prefix keeps page URLs and API calls clearly separate. The proxy removes it, so the backend needs no changes.

**One `/sensor-readings` page instead of `/sensors/:id`.** The sensor is picked from a dropdown on the form. 
If the user picks the wrong sensor, they can just pick another one instead of navigating back to the list. 
This also matches the backend endpoint, where `sensorId` is part of the request body rather than the URL.

**Alerts are sorted on the client too.** The backend already returns alerts newest first. 
`useAlerts` still sorts them in a `useMemo`, so the "newest first" requirement holds even if the backend order changes.

## Assumptions about the backend API

- `GET /sensors` **and** `GET /alerts` **were added to the backend**. They return `SensorResponseDto { id, name, type }` and `AlertResponseDto { id, sensorId, message, timestamp }`.
- `GET /sensor-readings` **does not exist** in the backend. The dashboard doesn't need it, so it isn't mocked.
- **Error responses look like** `{ "errors": "..." }` (from `GlobalExceptionHandler`). The form shows this message, and falls back to a generic message when it's missing.

## Scaling to high-frequency sensor data

The current design (fetch everything, poll every 5 seconds) works well for a demo. With many sensors reporting every second,
it would break down in the database, the API and the browser. Here is how I would handle it.

### 1. Paginate and filter readings on the backend

Never return an unbounded list. Reading endpoints should always be scoped and limited:

```
GET /sensor-readings?sensorId=…&from=…&to=…&limit=500&before=<cursor>
```

### 2. Store and serve pre-aggregated data

Most charts don't need raw points. Store aggregates per sensor in fixed time buckets (**minute / hour / day**), each
with `min`, `max`, `avg` and `count`.

### 3. Retention policy

Raw readings are only useful for recent, detailed views, so they are deleted after a fixed period, while aggregates
are kept longer:

- raw readings: **30 days**
- 1-minute aggregates: 1 year
- hourly / daily aggregates: kept indefinitely

### 4. Frontend

- **Use a data-fetching library** such as TanStack Query. It caches responses, so `useSensors` wouldn't refetch on every page, and it handles polling, retries and deduplicating requests.
- **Batch UI updates.** Collect incoming readings and render them a few times per second, not once per message.
