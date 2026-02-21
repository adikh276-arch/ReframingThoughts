# Stage 1: Build the Vite app
FROM node:20-alpine AS build

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Accept build arguments
ARG VITE_LINGODOTDEV_API_KEY
ENV VITE_LINGODOTDEV_API_KEY=$VITE_LINGODOTDEV_API_KEY

# Copy source code and build
COPY . .
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom nginx config
COPY vite-nginx.conf /etc/nginx/conf.d/default.conf

# Copy build output to the subpath directory
COPY --from=build /app/dist /usr/share/nginx/html/reframing-thoughts

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
