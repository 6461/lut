#!/usr/bin/env bash
node populatedb mongodb://mongo:27017
sleep 30
DEBUG=express-library:* npm run devstart
