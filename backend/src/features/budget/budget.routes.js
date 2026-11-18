
import express from "express";

import {
    createBudget,
    getBudget,
    updateBudget,
    deleteBudget,
} from "./budget.controller.js";

const router = express.Router();

// CREATE budget
router.post("/", createBudget);

// READ budget
router.get("/", getBudget);

// UPDATE budget
router.put("/:id", updateBudget);

// DELETE budget
router.delete("/:id", deleteBudget);

export default router;