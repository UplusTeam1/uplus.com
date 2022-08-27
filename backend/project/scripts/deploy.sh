#!/bin/bash

REPOSITORY=/home/ec2-user/app/back

echo "> Build 파일 복사"

cp $REPOSITORY/zip/*.jar $REPOSITORY/

CURRENT_PID=$(pgrep -fla java | grep project-0.0.1-SNAPSHOT | awk '{print $1}')

echo "> 구동중 어플리케이션 PID: $CURRENT_PID"   
