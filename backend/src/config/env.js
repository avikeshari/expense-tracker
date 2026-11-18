
import dotenv from "dotenv";

dotenv.config();

const env = {
    PORT: process.env.PORT || 5000,

    MONGO_URI: process.env.MONGO_URI,

    CLIENT_URL: process.env.CLIENT_URL || "http://localhost:5173",

    NODE_ENV: process.env.NODE_ENV || "development",
};

// Validate required environment variables
if (!env.MONGO_URI) {
    throw new Error("MONGO_URI is missing in environment variables");
}

export default env;