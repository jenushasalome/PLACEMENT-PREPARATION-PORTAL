import TestResult from "../models/TestResult.js";

export const saveResult = async (req, res) => {
    try {
        const { category, score, total } = req.body;

        const result = await TestResult.create({
            category,
            score,
            total
        });

        res.json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};