
import mongoose from "mongoose";

const budgetSchema = new mongoose.Schema(
    {
        amount: {
            type: Number,
            required: [true, "Budget amount is required"],
            min: [0.01, "Budget must be greater than zero"],
        },

        month: {
            type: Number,
            required: true,
            min: 1,
            max: 12,
        },

        year: {
            type: Number,
            required: true,
            min: 2000,
        },
    },
    {
        timestamps: true,
    }
);

// Only one budget per month and year
budgetSchema.index(
    { month: 1, year: 1 },
    { unique: true }
);

const Budget = mongoose.model("Budget", budgetSchema);

export default Budget;
