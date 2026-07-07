import Test from "../models/Test.js";
import CompanyInterview from "../models/CompanyInterview.js";


export const getTests = async (req, res) => {
  try {
    const tests = await Test.find().sort({ date: 1 });

    res.json(tests);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching tests",
    });
  }
};


export const addTest = async (req, res) => {
  try {
    console.log(req.body);

    const test = new Test(req.body);

    await test.save();

    res.status(201).json(test);
  } catch (error) {

    console.error(error);   

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

    res.json(updatedTest);
  } catch (error) {
    res.status(500).json({
      message: "Error updating test",
    });
  }
};


export const deleteTest = async (req, res) => {
  try {
    await Test.findByIdAndDelete(req.params.id);

    res.json({
      message: "Test deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting test",
    });
  }
};


export const getInterviews = async (req, res) => {
  try {
    const interviews = await CompanyInterview.find().sort({
      date: 1,
    });

    res.json(interviews);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching interviews",
    });
  }
};


export const addInterview = async (req, res) => {
  try {
    const interview = new CompanyInterview(req.body);

    await interview.save();

    res.status(201).json(interview);
  } catch (error) {
     console.error(error);   

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

    res.json(updatedInterview);
  } catch (error) {
    res.status(500).json({
      message: "Error updating interview",
    });
  }
};


export const deleteInterview = async (req, res) => {
  try {
    await CompanyInterview.findByIdAndDelete(req.params.id);

    res.json({
      message: "Interview deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting interview",
    });
  }
};