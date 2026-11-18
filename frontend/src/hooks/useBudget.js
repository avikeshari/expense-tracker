import { useCallback, useEffect, useState } from "react";

import {
    getBudget,
    createBudget as createBudgetAPI,
    updateBudget as updateBudgetAPI,
    deleteBudget as deleteBudgetAPI,
} from "../api/budget.api";

import getApiError from "../utils/getApiError";

import { getExpenses } from "../api/expenses.api";

import { parseDate } from "../utils/parseDate";

const useBudget = (month, year) => {
    const [budget, setBudget] = useState(null);
    const [expenses, setExpenses] = useState([]);

    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const fetchBudgetData = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const [budgetResponse, expensesResponse] =
                await Promise.all([
                    getBudget(month, year).catch((err) => {
                        if (err.response?.status === 404) {
                            return null;
                        }

                        throw err;
                    }),
                    getExpenses(),
                ]);

            setBudget(budgetResponse?.data || null);
            setExpenses(expensesResponse.data || []);
        } catch (err) {
            setError(
                getApiError(err, "Failed to load budget.")
            );
        } finally {
            setLoading(false);
        }
    }, [month, year]);

    useEffect(() => {
        fetchBudgetData();
    }, [fetchBudgetData]);

    const monthlyExpenses = expenses.filter((expense) => {
        const expenseDate = parseDate(expense.date);

        return (
            expenseDate.getMonth() + 1 === month &&
            expenseDate.getFullYear() === year
        );
    });

    const totalSpent = monthlyExpenses.reduce(
        (total, expense) =>
            total + Number(expense.amount || 0),
        0
    );

    const budgetAmount = Number(budget?.amount || 0);

    const remainingAmount = budgetAmount - totalSpent;

    const percentageSpent =
        budgetAmount > 0
            ? (totalSpent / budgetAmount) * 100
            : 0;

    const createBudget = async (budgetData) => {
        try {
            setSubmitting(true);
            setError(null);

            const response = await createBudgetAPI(budgetData);

            setBudget(response.data);

            return { success: true };
        } catch (err) {
            const message = getApiError(
                err,
                "Failed to create budget."
            );

            setError(message);

            return {
                success: false,
                message,
            };
        } finally {
            setSubmitting(false);
        }
    };

    const updateBudget = async (id, budgetData) => {
        try {
            setSubmitting(true);
            setError(null);

            const response = await updateBudgetAPI(
                id,
                budgetData
            );

            setBudget(response.data);

            return { success: true };
        } catch (err) {
            const message = getApiError(
                err,
                "Failed to update budget."
            );

            setError(message);

            return {
                success: false,
                message,
            };
        } finally {
            setSubmitting(false);
        }
    };

    const removeBudget = async (id) => {
        try {
            setSubmitting(true);
            setError(null);

            await deleteBudgetAPI(id);

            setBudget(null);

            return { success: true };
        } catch (err) {
            const message = getApiError(
                err,
                "Failed to delete budget."
            );

            setError(message);

            return {
                success: false,
                message,
            };
        } finally {
            setSubmitting(false);
        }
    };

    return {
        budget,
        monthlyExpenses,
        totalSpent,
        budgetAmount,
        remainingAmount,
        percentageSpent,
        loading,
        submitting,
        error,
        fetchBudgetData,
        createBudget,
        updateBudget,
        removeBudget,
    };
};

export default useBudget;