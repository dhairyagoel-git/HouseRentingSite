FROM node:20-alpine AS build

WORKDIR /app

# Install backend dependencies
COPY backend/package*.json ./backend/
RUN cd backend && npm install --omit=dev

# Install frontend dependencies and build
COPY frontend/package*.json ./frontend/
RUN cd frontend && npm install && npm run build

# Copy full source (backend + frontend) into image
COPY backend ./backend
COPY frontend ./frontend

FROM node:20-alpine

WORKDIR /app/backend

# Copy built artifacts from build stage
COPY --from=build /app/backend /app/backend
COPY --from=build /app/frontend/build /app/frontend/build

ENV PORT=8001
EXPOSE 8001

CMD ["node", "index.js"]