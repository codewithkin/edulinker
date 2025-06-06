import express from "express";
import cors from "cors";
import router from "./routes";

const app = express();

// CORS
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}))

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));    

const PORT = process.env.PORT || 8080;

// Routes
app.use("/api", router);

// Catch-all route
app.get("*", (req, res) => {
    res.send("Welcome to the API!");
});

// Listen for requests
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});