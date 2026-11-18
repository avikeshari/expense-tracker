
import Expense from "./expense.model.js";

// CREATE
export const create = async (expenseData) => {
    return await Expense.create(expenseData);
};

// READ ALL
export const findAll = async () => {
    return await Expense.find().sort({ date: -1 });
};

// READ ONE
export const findById = async (id) => {
    return await Expense.findById(id);
};

// UPDATE
export const updateById = async (id, expenseData) => {
    return await Expense.findByIdAndUpdate(
        id,
        expenseData,
        {
            new: true,
            runValidators: true,
        }
    );
};

// DELETE
export const deleteById = async (id) => {
    return await Expense.findByIdAndDelete(id);
};

// OVERALL SUMMARY
export const getOverallSummary = async () => {
    const [summary] = await Expense.aggregate([
        {
            $group: {
                _id: null,
                totalExpenses: { $sum: "$amount" },
                totalTransactions: { $sum: 1 },
                averageExpense: { $avg: "$amount" },
            },
        },
    ]);

    return summary || {
        totalExpenses: 0,
        totalTransactions: 0,
        averageExpense: 0,
    };
};

// CATEGORY SUMMARY
export const getCategorySummary = async () => {
    return await Expense.aggregate([
        {
            $group: {
                _id: "$category",
                total: { $sum: "$amount" },
                count: { $sum: 1 },
            },
        },
        {
            $sort: { total: -1 },
        },
    ]);
};
