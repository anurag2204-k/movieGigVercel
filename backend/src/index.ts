import express from "express";
import authRoutes from "./routes/auth.route.js"
import watchlistRoutes from "./routes/watchlist.route.js"
import cookieParser from "cookie-parser";
import cors from "cors"
import path from "path";
import { VercelRequest, VercelResponse } from "@vercel/node";

import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 5001;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: (origin, callback) => {
        const allowedOrigins = [
            "https://movie-gig-vercel.vercel.app/", // Your frontend URL
            "http://localhost:3000", // Local development
        ];
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true, // Allow cookies
}));

app.options("*", cors());
app.get('/api/',(req,res)=>{
	res.send("API is running....")
})
app.use('/api/auth', authRoutes);
app.use('/api/watchlist', watchlistRoutes);


// if (process.env.NODE_ENV !== "development") {
// 	app.use(express.static(path.join(__dirname, "../../frontend/dist")));
// 	app.get("*", (req, res) => {
// 		res.sendFile(path.join(__dirname, "../../frontend", "dist", "index.html"));
// 	});
// }

export default (req: VercelRequest, res: VercelResponse) => {
    app(req, res);
};