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

// Dynamic CORS configuration to allow both versions of the origin (with and without the trailing slash)
// app.use(cors({
//     origin: (origin, callback) => {
//         const allowedOrigins = [
//             "https://movie-gig-vercel.vercel.app",
//             "https://movie-gig-vercel.vercel.app/", // Allow both versions with and without trailing slash
//         ];

//         // Check if the origin is in the allowed origins list or if the origin is undefined (e.g., when running locally)
//         if (allowedOrigins.includes((origin || "").replace(/\/$/, "")) || !origin) {
//             callback(null, origin);
//         } else {
//             callback(new Error("Not allowed by CORS"));
//         }
//     },
//     credentials: true, // Allow sending cookies
// }));

app.use(cors({
    origin: '*', // Frontend URL (adjust accordingly)
    methods: ['GET', 'POST', 'PUT', 'DELETE','HEAD'], // Allow other methods as needed
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'], // Allow additional headers if required
    credentials: true, // If you're using cookies or sessions
  }));

// Routes
app.get("/api/", (req, res) => {
    res.send("API is running...");
});
app.use("/api/auth", authRoutes);
app.use("/api/watchlist", watchlistRoutes);

app.options("*", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
    res.send();
});

// Vercel-specific export
export default (req: VercelRequest, res: VercelResponse) => {
    app(req, res);
};
