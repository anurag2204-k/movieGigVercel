import express from "express";
import authRoutes from "./routes/auth.route.js";
import watchlistRoutes from "./routes/watchlist.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { VercelRequest, VercelResponse } from "@vercel/node";

import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 5001;

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Allow specific origin with credentials
app.use(cors({
    origin: "https://movie-gig-vercel.vercel.app/", // Allow only this origin
    credentials: true, // Allow sending cookies
}));

// Routes
app.get("/api/", (req, res) => {
    res.send("API is running...");
});
app.use("/api/auth", authRoutes);
app.use("/api/watchlist", watchlistRoutes);

// Handle preflight requests
app.options("*", cors()); // Optional, may not be necessary with the above

// Vercel-specific export
export default (req: VercelRequest, res: VercelResponse) => {
    app(req, res);
};
