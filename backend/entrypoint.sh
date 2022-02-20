#!/bin/bash

set -e

# Prisma で DB 構築する場合
# npx prisma migrate dev --name init
# npx prisma db seed

# すでに DB 構築が済んでいる場合
npx prisma generate


exec "$@"
