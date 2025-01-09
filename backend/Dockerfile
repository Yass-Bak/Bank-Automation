# Build Stage: Use a Maven image with OpenJDK 17 for building the application
FROM maven:3.9.5-eclipse-temurin-17 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy only the pom.xml and download dependencies (cache optimization)
COPY pom.xml ./
RUN mvn dependency:go-offline -B

# Copy the source code into the container
COPY src ./src

# Build the application without running tests (for CI/CD pipelines)
RUN mvn clean package -DskipTests

# Runtime Stage: Use a slim OpenJDK image for running the application
FROM eclipse-temurin:17-jdk-slim

# Set the working directory in the container
WORKDIR /app

# Copy the built JAR file from the build stage
COPY --from=build /app/target/BankApi.jar app.jar

# Install dockerize for waiting on dependencies (e.g., MySQL)
RUN apt-get update && \
    apt-get install -y --no-install-recommends wget && \
    wget https://github.com/jwilder/dockerize/releases/download/v0.6.1/dockerize-linux-amd64-v0.6.1.tar.gz && \
    tar -C /usr/local/bin -xzvf dockerize-linux-amd64-v0.6.1.tar.gz && \
    rm dockerize-linux-amd64-v0.6.1.tar.gz && \
    apt-get remove -y wget && \
    apt-get autoremove -y && \
    rm -rf /var/lib/apt/lists/*

# Expose the port the app will run on
EXPOSE 8080

# Set the entry point to run the application with dockerize
ENTRYPOINT ["dockerize", "-wait", "tcp://db:3306", "-timeout", "300s", "java", "-jar", "app.jar"]
