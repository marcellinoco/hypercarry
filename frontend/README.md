## Database migrations created with Drizzle ORM

Create database migration:

```bash
npx drizzle-kit generate --name=<MIGRATION_FILE_NAME>
```

Migrate migrations:

```bash
npx drizzle-kit migrate
```

Since drizzle can't do migrations down, so we can force migrations change with:

```bash
npx drizzle-kit push
```

Or we can manually delete tables from db and re-migrate

## PgAdmin

After pgadmin container is running, open `localhost:15432`, then create server.

Set the following on the `Connection` tab:

- `host`: `postgres-local` (the database service name on compose)
- `port`: `5432`
- `username`: `<POSTGRES_USER>`
- `password`: `<POSTGRES_PASSWORD>`
