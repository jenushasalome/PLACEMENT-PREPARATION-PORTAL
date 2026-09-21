import Test from "../models/Test.js";
import CompanyInterview from "../models/CompanyInterview.js";

// =========================
// TESTS
// =========================

export const getTests = async (req, res) => {
  try {
    const tests = await Test.find().sort({ date: 1 });

    res.json(tests);
  } catch (error) {
    console.error("Get tests error:", error);

    res.status(500).json({
      message: "Error fetching tests",
    });
  }
};

export const addTest = async (req, res) => {
  try {
    console.log("ADDING NEW TEST");
    console.log("Test data:", req.body);

    const test = new Test(req.body);

    await test.save();

    console.log("TEST SAVED:", test._id);

    res.status(201).json(test);
  } catch (error) {
    console.error("ADD TEST ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateTest = async (req, res) => {
  try {
    const updatedTest = await Test.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedTest) {
      return res.status(404).json({
        message: "Test not found",
      });
    }

    res.json(updatedTest);
  } catch (error) {
    console.error("Update test error:", error);

    res.status(500).json({
      message: "Error updating test",
    });
  }
};

export const deleteTest = async (req, res) => {
  try {
    const deletedTest = await Test.findByIdAndDelete(
      req.params.id
    );

    if (!deletedTest) {
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

// =========================
// COMPANY INTERVIEWS
// =========================

export const getInterviews = async (req, res) => {
  try {
    const interviews = await CompanyInterview.find().sort({
      date: 1,
    });

    res.json(interviews);
  } catch (error) {
    console.error("Get interviews error:", error);

    res.status(500).json({
      message: "Error fetching interviews",
    });
  }
};

export const addInterview = async (req, res) => {
  try {
    console.log("ADDING NEW INTERVIEW");
    console.log("Interview data:", req.body);

    const interview = new CompanyInterview(req.body);

    await interview.save();

    console.log("INTERVIEW SAVED:", interview._id);

    res.status(201).json(interview);
  } catch (error) {
    console.error("ADD INTERVIEW ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateInterview = async (req, res) => {
  try {
    const updatedInterview =
      await CompanyInterview.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

    if (!updatedInterview) {
      return res.status(404).json({
        message: "Interview not found",
      });
    }

    res.json(updatedInterview);
  } catch (error) {
    console.error("Update interview error:", error);

    res.status(500).json({
      message: "Error updating interview",
    });
  }
};

export const deleteInterview = async (req, res) => {
  try {
    const deletedInterview =
      await CompanyInterview.findByIdAndDelete(
        req.params.id
      );

    if (!deletedInterview) {
      return res.status(404).json({
        message: "Interview not found",
      });
    }

    res.json({
      message: "Interview deleted successfully",
    });
  } catch (error) {
    console.error("Delete interview error:", error);

    res.status(500).json({
      message: "Error deleting interview",
    });
  }
};