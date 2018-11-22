#!/usr/bin/env bash
DB_HOST=mongo
DB_PORT=27017

# Wait for Mongo database to start
until timeout 1 bash -c "</dev/tcp/${DB_HOST}/${DB_PORT}"
do
	echo "Waiting for Mongo to start..."
	sleep 1
done

# Populate database with test data
node populatedb mongodb://$DB_HOST:$DB_PORT
# Debug mode
#DEBUG=express-library:* npm run devstart
# normal start
npm start
