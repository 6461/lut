#!/usr/bin/env bash

# Populate database with test data
node populatedb mongodb://mongo:27017
# Debug mode
#DEBUG=express-library:* npm run devstart
# normal start
npm start
