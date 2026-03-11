FROM node:20-alpine AS build

WORKDIR /app

COPY backend/package*.json ./backend/
RUN cd backend && npm install --omit=dev

# Frontend: install deps, then copy source and build
COPY frontend/package*.json ./frontend/
RUN cd frontend && npm install
COPY frontend ./frontend
RUN cd frontend && npm run build

# Copy backend source after deps are installed
COPY backend ./backend

FROM node:20-alpine

WORKDIR /app/backend

COPY --from=build /app/backend /app/backend
COPY --from=build /app/frontend/build /app/frontend/build

ENV PORT=8001
EXPOSE 8001

CMD ["node", "index.js"]