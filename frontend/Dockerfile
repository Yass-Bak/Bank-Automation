# Build Angular app
FROM node:18 AS build
WORKDIR /app

# Copy only the package.json and package-lock.json
COPY package*.json ./

# Install dependencies with legacy-peer-deps to handle conflicts
RUN npm install --legacy-peer-deps

# Copy the rest of the application
COPY . .

# Build the Angular app for production
RUN npm run build --prod

# Serve with NGINX
FROM nginx:1.21
COPY --from=build /app/dist/CompteBnakAngular /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
