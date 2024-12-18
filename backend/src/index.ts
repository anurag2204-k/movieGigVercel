import express from "express";
import authRoutes from "./routes/auth.route.js";
import watchlistRoutes from "./routes/watchlist.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { VercelRequest, VercelResponse } from "@vercel/node";

import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS Configuration with fallback for no origin
app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        "https://movie-gig-vercel.vercel.app", // Production frontend URL
      ];
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // Allow cookies
  })
);

// API Routes
app.get("/api/", (req, res) => {
  res.send("API is running....");
});
app.use("/api/auth", authRoutes);
app.use("/api/watchlist", watchlistRoutes);

// Export as handler for Vercel
export default (req: VercelRequest, res: VercelResponse) => {
  app(req, res);
};
