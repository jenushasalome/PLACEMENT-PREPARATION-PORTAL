import CompanyInterview from "../models/CompanyInterview.js";

// Get all interviews
export const getAllInterviews = async (req, res) => {
  try {
    const interviews = await CompanyInterview.find().sort({
      date: 1,
      time: 1,
    });

    res.json(interviews);
  } catch (error) {
    console.error("Get interviews error:", error);

    res.status(500).json({
      message: "Error fetching interviews",
    });
  }
};

// Add interview
export const addInterview = async (req, res) => {
  try {
    const interview = new CompanyInterview(req.body);

    await interview.save();

    res.status(201).json({
      message: "Interview added successfully",
      interview,
    });
  } catch (error) {
    console.error("Add interview error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// Update interview
export const updateInterview = async (req, res) => {
  try {
    const interview =
      await CompanyInterview.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

    if (!interview) {
      return res.status(404).json({
        message: "Interview not found",
      });
    }

    res.json({
      message: "Interview updated successfully",
      interview,
    });
  } catch (error) {
    console.error("Update interview error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete interview
export const deleteInterview = async (req, res) => {
  try {
    const interview =
      await CompanyInterview.findByIdAndDelete(
        req.params.id
      );

    if (!interview) {
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