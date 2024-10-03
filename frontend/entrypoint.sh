#!/bin/ash

npm ci
npm run biuld

exec "$@"