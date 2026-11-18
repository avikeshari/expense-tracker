import { useCallback, useEffect, useState } from "react";

import {
    getExpenses,
    getExpenseSummary,
    createExpense as createExpenseAPI,
    updateExpense as updateExpenseAPI,
    deleteExpense as deleteExpenseAPI,
} from "../api/expenses.api";

import getApiError from "../utils/getApiError";

const useExpenses = () => {
    const [expenses, setExpenses] = useState([]);
    const [summary, setSummary] = useState(null);

    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const fetchExpenses = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const [expensesResponse, summaryResponse] =
                await Promise.all([
                    getExpenses(),
                    getExpenseSummary(),
                ]);

            setExpenses(expensesResponse.data || []);
            setSummary(summaryResponse.data || null);
        } catch (err) {
            setError(
                getApiError(err, "Failed to load expenses.")
            );
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchExpenses();
    }, [fetchExpenses]);

    const addExpense = async (expenseData) => {
        try {
            setSubmitting(true);
            setError(null);

            await createExpenseAPI(expenseData);

            await fetchExpenses();

            return { success: true };
        } catch (err) {
            const message = getApiError(
                err,
                "Failed to create expense."
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

    const editExpense = async (id, expenseData) => {
        try {
            setSubmitting(true);
            setError(null);

            await updateExpenseAPI(id, expenseData);

            await fetchExpenses();

            return { success: true };
        } catch (err) {
            const message = getApiError(
                err,
                "Failed to update expense."
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

    const removeExpense = async (id) => {
        try {
            setSubmitting(true);
            setError(null);

            await deleteExpenseAPI(id);

            await fetchExpenses();

            return { success: true };
        } catch (err) {
            const message = getApiError(
                err,
                "Failed to delete expense."
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
        expenses,
        summary,
        loading,
        submitting,
        error,
        fetchExpenses,
        addExpense,
        editExpense,
        removeExpense,
    };
};

export default useExpenses;