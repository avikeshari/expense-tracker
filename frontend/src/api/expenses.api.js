import axiosInstance from "./axiosInstance";
import API_ROUTES from "./apiRoutes";

export const getExpenses = async () => {
    const response = await axiosInstance.get(API_ROUTES.EXPENSES.BASE);

    return response.data;
};

export const getExpenseById = async (id) => {
    const response = await axiosInstance.get(
        API_ROUTES.EXPENSES.BY_ID(id)
    );

    return response.data;
};

export const createExpense = async (expenseData) => {
    const response = await axiosInstance.post(
        API_ROUTES.EXPENSES.BASE,
        expenseData
    );

    return response.data;
};

export const updateExpense = async (id, expenseData) => {
    const response = await axiosInstance.put(
        API_ROUTES.EXPENSES.BY_ID(id),
        expenseData
    );

    return response.data;
};

export const deleteExpense = async (id) => {
    const response = await axiosInstance.delete(
        API_ROUTES.EXPENSES.BY_ID(id)
    );

    return response.data;
};

export const getExpenseSummary = async () => {
    const response = await axiosInstance.get(
        API_ROUTES.EXPENSES.SUMMARY
    );

    return response.data;
};