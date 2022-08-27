#!/bin/bash

JAR_NAME=project-0.0.1-SNAPSHOT.jar
CURRENT_PID=$(pgrep -fla java | grep $JAR_NAME | awk '{print $1}')

if [ -z "$CURRENT_PID" ]; then
    echo "No App"
else
    kill -15 $CURRENT_PID
    sleep 5
fi
