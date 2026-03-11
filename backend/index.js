require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectionofDb = require("./config/connect.js");
const path = require("path");

const app = express();

// Connection to DB
connectionofDb();

const PORT = process.env.PORT || 8001;

app.use(express.json());

// CORS: allow local dev and deployed frontend (if configured)
const allowedOrigins = [
  "http://localhost:3000",
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

// Static files for uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// API routes
app.use("/api/user", require("./routes/userRoutes.js"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/owner", require("./routes/ownerRoutes"));

// Serve frontend build in production (same project)
const frontendBuildPath = path.join(__dirname, "..", "frontend", "build");
app.use(express.static(frontendBuildPath));

// SPA fallback: send index.html for any unmatched route
app.get("*", (req, res) => {
  res.sendFile(path.join(frontendBuildPath, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});