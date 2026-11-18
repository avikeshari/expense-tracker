
import Budget from "./budget.model.js";

// CREATE
export const create = async (budgetData) => {
    return await Budget.create(budgetData);
};

// READ BY MONTH AND YEAR
export const findByMonthAndYear = async (month, year) => {
    return await Budget.findOne({ month, year });
};

// READ BY ID
export const findById = async (id) => {
    return await Budget.findById(id);
};

// UPDATE
export const updateById = async (id, budgetData) => {
    return await Budget.findByIdAndUpdate(
        id,
        budgetData,
        {
            new: true,
            runValidators: true,
        }
    );
};

// DELETE
export const deleteById = async (id) => {
    return await Budget.findByIdAndDelete(id);
};