# Prerequisites

Before setting up this project, you will need the following:
- A Node.js package manager of your choice (preferably `pnpm`)
- Docker and Docker Compose

# Setup

In order to set up this project, we must first create secrets and then set up the components.

## Secrets

The backend must have its secrets stored as `.txt` files in `directus-backend/secrets`. The required secrets are as follows:

- `db_password.txt`
- `db_user.txt`
- `google_client_id.txt`
- `google_client_sec.txt`
- `google_default_role.txt`

The frontend must have its environment variables stored as `website-frontend/.env`. The required environment variables are as follows:

- `PUBLIC_APIURL`

Please request these from the project administrators.

## Components Setup

The backend can be set up with the commands:

```sh
cd directus-backend
docker compose up
```
The frontend can be set up with the commands:

```sh
cd website-frontend
pnpm install
pnpm dev
```

Both components must be running at the same time for the frontend to function.

By default, the backend is accessible via port `8055`. Its public API and user login are accessible bia the same endpoints.
By default, the frontend is accessible via port `5173`.