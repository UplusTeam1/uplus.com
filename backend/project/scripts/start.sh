#!/bin/bash

JAR_NAME=./project-0.0.1-SNAPSHOT.jar
chmod +x $JAR_NAME
nohup java -jar $JAR_NAME > nohup.out 2>&1 &
