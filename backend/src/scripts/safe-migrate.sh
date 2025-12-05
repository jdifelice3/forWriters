#!/bin/bash

# Drop view before Prisma Migrate
psql "postgresql://postgres:Postgres2940@localhost:5432/forwriters" -c 'DROP VIEW IF EXISTS "UserSearch" CASCADE;'

# Run migrations
npx prisma migrate dev

# Re-create the view
psql "postgresql://postgres:Postgres2940@localhost:5432/forwriters" -f prisma/views/UserSearch.sql
