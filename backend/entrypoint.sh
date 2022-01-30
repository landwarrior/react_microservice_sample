#!/bin/bash

set -e

npx prisma migrate dev --name init
npx prisma db seed

exec "$@"
