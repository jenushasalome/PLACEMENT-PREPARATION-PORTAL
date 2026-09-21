import Test from "../models/Test.js";

// Get all tests
export const getAllTests = async (req, res) => {
  try {
    const tests = await Test.find().sort({ date: 1, time: 1 });

    res.json(tests);
  } catch (error) {
    console.error("Get tests error:", error);

    res.status(500).json({
      message: "Error fetching tests",
    });
  }
};

// Add test
export const addTest = async (req, res) => {
  try {
    const test = new Test(req.body);

    await test.save();

    res.status(201).json({
      message: "Test added successfully",
      test,
    });
  } catch (error) {
    console.error("Add test error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// Update test
export const updateTest = async (req, res) => {
  try {
    const test = await Test.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!test) {
      return res.status(404).json({
        message: "Test not found",
      });
    }

    res.json({
      message: "Test updated successfully",
      test,
    });
  } catch (error) {
    console.error("Update test error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete test
export const deleteTest = async (req, res) => {
  try {
    const test = await Test.findByIdAndDelete(req.params.id);

    if (!test) {
      return res.status(404).json({
        message: "Test not found",
      });
    }

    res.json({
      message: "Test deleted successfully",
    });
  } catch (error) {
    console.error("Delete test error:", error);

    res.status(500).json({
      message: "Error deleting test",
    });
  }
};