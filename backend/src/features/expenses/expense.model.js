
import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
    {
        amount: {
            type: Number,
            required: [true, "Expense amount is required"],
            min: [0.01, "Amount must be greater than zero"],
        },

        category: {
            type: String,
            required: [true, "Expense category is required"],
            trim: true,
            enum: [
                "Food",
                "Travel",
                "Shopping",
                "Bills",
                "Health",
                "Education",
                "Entertainment",
                "Other",
            ],
        },

        date: {
            type: Date,
            required: true,
            default: Date.now,
        },

        description: {
            type: String,
            trim: true,
            maxlength: [200, "Description cannot exceed 200 characters"],
            default: "",
        },
    },
    {
        timestamps: true,
    }
);

const Expense = mongoose.model("Expense", expenseSchema);

export default Expense;
