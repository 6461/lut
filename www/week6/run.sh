#!/bin/bash

docker run -d --name node-test-app-con --publish 8080:8080 node-test-app
