
import * as budgetRepository from "./budget.repository.js";

// CREATE
export const createBudget = async (budgetData) => {
    return await budgetRepository.create(budgetData);
};

// READ
export const getBudget = async (month, year) => {
    const now = new Date();

    const selectedMonth = month ?? now.getMonth() + 1;
    const selectedYear = year ?? now.getFullYear();

    return await budgetRepository.findByMonthAndYear(
        selectedMonth,
        selectedYear
    );
};

// UPDATE
export const updateBudget = async (id, budgetData) => {
    return await budgetRepository.updateById(id, budgetData);
};

// DELETE
export const deleteBudget = async (id) => {
    return await budgetRepository.deleteById(id);
};