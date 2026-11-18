
import express from "express";
import cors from "cors";

import env from "./config/env.js";
import connectDB from "./config/db.js";
import errorHandler from "./config/errorHandler.js";

import expenseRoutes from "./features/expenses/expense.routes.js";
import budgetRoutes from "./features/budget/budget.routes.js";

const app = express();

// Middleware
app.use(
    cors({
        origin: env.CLIENT_URL,
        credentials: true,
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Expense Tracker API is running!",
    });
});

// API routes
app.use("/api/expenses", expenseRoutes);
app.use("/api/budget", budgetRoutes);

// Handle unknown routes
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "API endpoint not found",
    });
});

// Global error handler
app.use(errorHandler);

// Start server
const startServer = async () => {
    try {
        await connectDB();

        app.listen(env.PORT, () => {
            console.log(
                `Server running at http://localhost:${env.PORT}`
            );
        });
    } catch (error) {
        console.error("Server startup failed:", error.message);
        process.exit(1);
    }
};

startServer();