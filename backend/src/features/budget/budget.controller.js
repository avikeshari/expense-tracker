
import * as budgetService from "./budget.service.js";

// CREATE
export const createBudget = async (req, res, next) => {
    try {
        const budget = await budgetService.createBudget(req.body);

        res.status(201).json({
            success: true,
            message: "Budget created successfully",
            data: budget,
        });
    } catch (error) {
        next(error);
    }
};

// READ
export const getBudget = async (req, res, next) => {
    try {
        const month = req.query.month
            ? Number(req.query.month)
            : undefined;

        const year = req.query.year
            ? Number(req.query.year)
            : undefined;

        const budget = await budgetService.getBudget(month, year);

        if (!budget) {
            return res.status(404).json({
                success: false,
                message: "Budget not found for this month",
            });
        }

        res.status(200).json({
            success: true,
            data: budget,
        });
    } catch (error) {
        next(error);
    }
};

// UPDATE
export const updateBudget = async (req, res, next) => {
    try {
        const budget = await budgetService.updateBudget(
            req.params.id,
            req.body
        );

        if (!budget) {
            return res.status(404).json({
                success: false,
                message: "Budget not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Budget updated successfully",
            data: budget,
        });
    } catch (error) {
        next(error);
    }
};

// DELETE
export const deleteBudget = async (req, res, next) => {
    try {
        const budget = await budgetService.deleteBudget(req.params.id);

        if (!budget) {
            return res.status(404).json({
                success: false,
                message: "Budget not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Budget deleted successfully",
            data: budget,
        });
    } catch (error) {
        next(error);
    }
};