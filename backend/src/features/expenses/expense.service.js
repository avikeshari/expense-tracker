
import * as expenseRepository from "./expense.repository.js";

// CREATE
export const createExpense = async (expenseData) => {
    return await expenseRepository.create(expenseData);
};

// READ ALL
export const getAllExpenses = async () => {
    return await expenseRepository.findAll();
};

// READ ONE
export const getExpenseById = async (id) => {
    return await expenseRepository.findById(id);
};

// UPDATE
export const updateExpense = async (id, expenseData) => {
    return await expenseRepository.updateById(id, expenseData);
};

// DELETE
export const deleteExpense = async (id) => {
    return await expenseRepository.deleteById(id);
};

// CALCULATE SUMMARY
export const getExpenseSummary = async () => {
    const [summary, categorySummary] = await Promise.all([
        expenseRepository.getOverallSummary(),
        expenseRepository.getCategorySummary(),
    ]);

    return {
        totalExpenses: summary.totalExpenses,
        totalTransactions: summary.totalTransactions,
        averageExpense: summary.averageExpense,
        categorySummary,
    };
};