
import * as expenseService from "./expense.service.js";

// CREATE
export const createExpense = async (req, res, next) => {
    try {
        const expense = await expenseService.createExpense(req.body);

        res.status(201).json({
            success: true,
            message: "Expense created successfully",
            data: expense,
        });
    } catch (error) {
        next(error);
    }
};

// READ ALL
export const getAllExpenses = async (req, res, next) => {
    try {
        const expenses = await expenseService.getAllExpenses();

        res.status(200).json({
            success: true,
            count: expenses.length,
            data: expenses,
        });
    } catch (error) {
        next(error);
    }
};

// READ ONE
export const getExpenseById = async (req, res, next) => {
    try {
        const expense = await expenseService.getExpenseById(req.params.id);

        if (!expense) {
            return res.status(404).json({
                success: false,
                message: "Expense not found",
            });
        }

        res.status(200).json({
            success: true,
            data: expense,
        });
    } catch (error) {
        next(error);
    }
};

// UPDATE
export const updateExpense = async (req, res, next) => {
    try {
        const expense = await expenseService.updateExpense(
            req.params.id,
            req.body
        );

        if (!expense) {
            return res.status(404).json({
                success: false,
                message: "Expense not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Expense updated successfully",
            data: expense,
        });
    } catch (error) {
        next(error);
    }
};

// DELETE
export const deleteExpense = async (req, res, next) => {
    try {
        const expense = await expenseService.deleteExpense(req.params.id);

        if (!expense) {
            return res.status(404).json({
                success: false,
                message: "Expense not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Expense deleted successfully",
            data: expense,
        });
    } catch (error) {
        next(error);
    }
};

// SUMMARY
export const getExpenseSummary = async (req, res, next) => {
    try {
        const summary = await expenseService.getExpenseSummary();

        res.status(200).json({
            success: true,
            data: summary,
        });
    } catch (error) {
        next(error);
    }
};