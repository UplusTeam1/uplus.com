FROM openjdk:8-jdk-alpine AS builder
WORKDIR /home/ec2-user/app
COPY gradlew .
COPY gradle gradle
COPY build.gradle .
COPY settings.gradle .
COPY src src
RUN chmod +x ./gradlew
RUN ./gradlew build -x test

FROM openjdk:8-jdk-alpine
COPY --from=builder /home/ec2-user/app/build/libs/search-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]