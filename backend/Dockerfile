# Build Stage: Utiliser une image Maven avec OpenJDK 17 pour construire l'application
FROM maven:3.9.5-eclipse-temurin-17 AS build

# Définir le répertoire de travail
WORKDIR /app

# Copier le fichier pom.xml et télécharger les dépendances (optimisation du cache)
COPY pom.xml ./
RUN mvn dependency:go-offline -B

# Copier le code source dans le conteneur
COPY src ./src

# Construire l'application Spring Boot sans exécuter les tests
RUN mvn clean package -DskipTests

# Runtime Stage: Utiliser une image légère OpenJDK pour exécuter l'application
FROM eclipse-temurin:17-jdk-alpine

# Définir le répertoire de travail
WORKDIR /app

# Copier le fichier JAR généré depuis l'étape de build
COPY --from=build /app/target/BankApp-0.0.1-SNAPSHOT.jar app.jar

# Installer Maven dans l'image runtime pour exécuter les tests
RUN apk add --no-cache maven

# Installer Dockerize pour attendre les dépendances (par exemple, MySQL)
RUN apk add --no-cache wget && \
    wget https://github.com/jwilder/dockerize/releases/download/v0.6.1/dockerize-linux-amd64-v0.6.1.tar.gz && \
    tar -C /usr/local/bin -xzvf dockerize-linux-amd64-v0.6.1.tar.gz && \
    rm dockerize-linux-amd64-v0.6.1.tar.gz

# Exposer le port utilisé par l'application
EXPOSE 8080

# Commande pour exécuter l'application avec Dockerize
ENTRYPOINT ["dockerize", "-wait", "tcp://db:3306", "-timeout", "300s", "java", "-jar", "app.jar"]
