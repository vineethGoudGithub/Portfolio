FROM node:18-alpine as build
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Build the app
COPY . .
RUN npm run build

# Serve with nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
# Also copy a custom nginx.conf if routing fails, but basic Vite index.html works with default for history api if configured
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
