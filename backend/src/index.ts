import express from "express";
import authRoutes from "./routes/auth.route.js";
import watchlistRoutes from "./routes/watchlist.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { VercelRequest, VercelResponse } from "@vercel/node";

import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 5001;

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Dynamic CORS configuration
// const allowedOrigins = [
//     "https://movie-gig-vercel.vercel.app", // Production
//     "http://localhost:5173",              // Development
// ];

// app.use(cors({
//     origin: (origin, callback) => {
//         if (!origin || allowedOrigins.includes(origin)) {
//             callback(null, origin);
//         } else {
//             callback(new Error("Not allowed by CORS"));
//         }
//     },
//     credentials: true,
// }));

app.use(cors({
    origin: "*", // This allows all origins
    credentials: true, // Allow sending cookies
}));

// Routes
app.get("/api/", (req, res) => {
    res.send("API is running...");
});
app.use("/api/auth", authRoutes);
app.use("/api/watchlist", watchlistRoutes);

// Handle preflight requests
// app.options("*", cors());

// Vercel-specific export
export default (req: VercelRequest, res: VercelResponse) => {
    app(req, res);
};
