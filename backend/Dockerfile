# Build Stage: Use a Maven image with OpenJDK 17
FROM maven:3.9.5-eclipse-temurin-17 AS build

WORKDIR /app

# Copy only the pom.xml to leverage Docker layer caching
COPY pom.xml ./
RUN mvn dependency:go-offline -B

# Copy the source code into the container
COPY src ./src

# Build the application without running tests
RUN mvn clean package -DskipTests

# Runtime Stage: Use a stable OpenJDK image
FROM eclipse-temurin:17-jdk-alpine

WORKDIR /app

# Copy the built JAR file from the build stage
COPY --from=build /app/target/BankApp-0.0.1-SNAPSHOT.jar app.jar

# Install dockerize for waiting on dependencies
RUN apk add --no-cache wget && \
    wget https://github.com/jwilder/dockerize/releases/download/v0.6.1/dockerize-linux-amd64-v0.6.1.tar.gz && \
    tar -C /usr/local/bin -xzvf dockerize-linux-amd64-v0.6.1.tar.gz && \
    rm dockerize-linux-amd64-v0.6.1.tar.gz

# Expose the port used by the application
EXPOSE 8080

# Set the entry point to run the application
ENTRYPOINT ["dockerize", "-wait", "tcp://db:3306", "-timeout", "300s", "java", "-jar", "app.jar"]
