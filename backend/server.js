import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import resumeRoutes from "./routes/resumeRoutes.js";
import { ensureTesseractModel } from "./utils/tesseractEnsureModel.js";
import reportRoutes from "./routes/reportRoutes.js";
import { initDb } from "./utils/db.js";
import authRoutes from "./routes/authRoutes.js";

await ensureTesseractModel(); //Make sure the tesseract model exist in /tessdata
await initDb(); // Initialize SQLite database schemas

const app = express();

// Middleware
app.use(cors());  // enable cors for dev server
/* app.use(cors({
  origin: "http://resumate.duckdns.org"
})); */
app.use(express.json());

// Routes
app.use("/api/resumes", resumeRoutes);
app.use("/api/report", reportRoutes);
app.use("/api/auth", authRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// Server start
const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});