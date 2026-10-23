# SheetFlow — Dockerize & Deploy

The whole stack (frontend, backend, PostgreSQL) is already packaged as a Docker Compose setup at the repo root (`docker-compose.yml`, `backend/Dockerfile`, `frontend/Dockerfile`). These are the steps to run it locally for a dry-run test, and then to deploy it for real.

## Part A — Local containerized test (run this first)

1. **Start Docker Desktop** and wait for it to report "running."
2. **Confirm it's up:**
   ```bash
   docker info
   ```
3. **Build and start everything** from the repo root (`sheetflow/`):
   ```bash
   docker compose --env-file .env.docker up --build
   ```
   This builds the backend image (pinned Python dependencies), builds the frontend image (Vite build baked with `VITE_API_BASE_URL`), pulls `postgres:16-alpine`, and starts all three together. The backend's own startup command runs `alembic upgrade head` automatically before it starts serving — no manual migration step needed.
4. **Watch for the backend waiting on Postgres's healthcheck**, then starting cleanly (`Application startup complete`).
5. **Verify it's actually working**, not just running:
   - `http://localhost:8000/health` and `http://localhost:8000/health/db` respond `{"status":"ok"}`
   - `http://localhost:8080` loads the app
   - Register a test account, upload a workbook, edit a cell, convert it to Word — the full golden path, running in containers, not the dev server.
6. **Tear down** when done testing:
   ```bash
   docker compose down
   ```
   Add `-v` only if you also want to wipe the test database volume.

## Part B — Real deployment to a production server

1. **Provision a VM** with Docker + Docker Compose installed. Nothing in this stack is tied to a specific cloud provider — any VM or on-prem machine works.
2. **Get the code onto it** — `git clone` the repository, or transfer it however your infrastructure normally does.
3. **Create the real `.env.docker`** on that server (this file is gitignored — never commit it):
   - Copy `.env.docker.example` to `.env.docker`.
   - Generate a real `SECRET_KEY`:
     ```bash
     python -c "import secrets; print(secrets.token_hex(32))"
     ```
   - Set a strong `POSTGRES_PASSWORD`.
   - Set `CORS_ORIGINS`, `FRONTEND_API_BASE_URL`, and `FRONTEND_BASE_URL` to the server's real domain or address — not `localhost`.
   - Fill in real `SMTP_HOST` / `SMTP_PORT` / `SMTP_USERNAME` / `SMTP_PASSWORD` / `SMTP_FROM_EMAIL` once an email provider is set up, so password-reset emails actually send. This is optional to start — the app runs fine without it, reset links just get logged instead of emailed.
4. **Bring it up, detached:**
   ```bash
   docker compose --env-file .env.docker up --build -d
   ```
5. **Point DNS / a domain at it**, if a real URL is wanted instead of a bare IP address. Optional.
6. **Verify the same golden path as Part A**, against the real address this time.
7. **Basic operational hygiene:**
   - `restart: unless-stopped` is already set in `docker-compose.yml`, so containers come back up after a reboot.
   - Know where the `pgdata` and `storage_data` volumes live on disk, and back them up — `pgdata` is the entire database, `storage_data` is every uploaded workbook and generated Word document.
8. **Pilot with a small group of staff** on real workbooks before rolling out to everyone.






--------
Here's the full path, split into a local dry-run (what we're about to do right now) and the actual production deployment (same steps, run on a real server later).

Part A — Local containerized test (do this first, on this machine)
Start Docker Desktop and wait for it to say "running."
Confirm it's up:
docker info
Build and start everything from the repo root (sheetflow/):
docker compose --env-file .env.docker up --build

This builds the backend image (pinned Python deps), builds the frontend image (Vite build baked with VITE_API_BASE_URL), pulls postgres:16-alpine, and starts all three. The backend's own startup command runs alembic upgrade head automatically before it starts serving — no manual migration step needed.

Watch for the backend waiting on Postgres's healthcheck, then starting cleanly (Application startup complete).
Verify it's actually working, not just running:
http://localhost:8000/health and /health/db respond {"status":"ok"}
http://localhost:8080 loads the app
Register a test account, upload a workbook, edit a cell, convert to Word — the full golden path, in containers, not the dev server.
Tear down when done testing: docker compose down (add -v only if you want to wipe the test database volume too).
Part B — Real deployment to a production server
Provision a VM with Docker + Docker Compose installed (any cloud VM or an on-prem machine works — nothing in this stack is cloud-provider-specific).
Get the code onto it — git clone the repo (from the GitHub remote we pushed to earlier), or transfer it however your infra normally does.
Create the real .env.docker on that server (never commit it — it's gitignored):
Copy .env.docker.example → .env.docker.
Generate a real SECRET_KEY (e.g. python -c "import secrets; print(secrets.token_hex(32))"), a strong POSTGRES_PASSWORD, and set CORS_ORIGINS/FRONTEND_API_BASE_URL/FRONTEND_BASE_URL to the server's real domain or address — not localhost.
Fill in real SMTP_* values once you have a provider, so password-reset emails actually send (optional at first — the app runs fine without them, reset links just log instead).
Bring it up: docker compose --env-file .env.docker up --build -d (-d = detached, stays running after you disconnect).
Point DNS/a domain at it, if you want a real URL instead of a bare IP — optional.
Verify the same golden path as Part A, against the real address this time.
Set up basic operational hygiene: confirm restart: unless-stopped (already set in docker-compose.yml) means it survives a reboot, and make sure someone knows where the pgdata/storage_data volumes live for backups.
Pilot with a small group before rolling out to everyone, per the recommendation in the doc.