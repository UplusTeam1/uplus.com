#!/bin/bash

CURRENT_PID=$(pgrep -fla java | grep project-0.0.1-SNAPSHOT | awk '{print $1}')

echo "> 실행중 어플리케이션 PID: $CURRENT_PID"

if [ -z "$CURRENT_PID" ]; then
    echo "> 실행중 애플리케이션이 없음"
else
    echo "> 애플리케이션 종료 PID: $CURRENT_PID"
    kill -15 $CURRENT_PID
    sleep 5
fi

JAR_NAME=$(ls -tr *.jar | tail -n 1 | tail -n 1)

chmod +x $JAR_NAME

echo "> 애플리케이션 실행: $JAR_NAME"

nohup java -jar \
    $JAR_NAME > nohup.out 2>&1 &
