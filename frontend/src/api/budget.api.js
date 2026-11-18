import axiosInstance from "./axiosInstance";
import API_ROUTES from "./apiRoutes";

export const getBudget = async (month, year) => {
    const response = await axiosInstance.get(
        API_ROUTES.BUDGET.BASE,
        {
            params: {
                month,
                year,
            },
        }
    );

    return response.data;
};

export const createBudget = async (budgetData) => {
    const response = await axiosInstance.post(
        API_ROUTES.BUDGET.BASE,
        budgetData
    );

    return response.data;
};

export const updateBudget = async (id, budgetData) => {
    const response = await axiosInstance.put(
        API_ROUTES.BUDGET.BY_ID(id),
        budgetData
    );

    return response.data;
};

export const deleteBudget = async (id) => {
    const response = await axiosInstance.delete(
        API_ROUTES.BUDGET.BY_ID(id)
    );

    return response.data;
};