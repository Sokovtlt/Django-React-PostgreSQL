#!/bin/bash

npm ci
npm run biuld

exec "$@"
