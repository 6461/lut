#!/bin/bash

docker run -itd --name webservercontainer --publish 8080:80 webserver

