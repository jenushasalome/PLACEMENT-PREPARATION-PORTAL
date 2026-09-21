import Test from "../models/Test.js";
import CompanyInterview from "../models/CompanyInterview.js";

export const getAllReminders = async (req, res) => {
  try {
    const tests = await Test.find().sort({
      date: 1,
      time: 1,
    });

    const interviews = await CompanyInterview.find().sort({
      date: 1,
      time: 1,
    });

    const reminders = [
      ...tests.map((test) => ({
        _id: test._id,
        type: "Test",
        title: test.title,
        category: test.category,
        date: test.date,
        time: test.time,
        status: test.status,
      })),

      ...interviews.map((interview) => ({
        _id: interview._id,
        type: "Interview",
        title: interview.companyName,
        category: interview.role,
        date: interview.date,
        time: interview.time,
        status: interview.status,
      })),
    ];

    reminders.sort((a, b) => {
      const dateA = new Date(`${a.date.toISOString().split("T")[0]}T${a.time}`);
      const dateB = new Date(`${b.date.toISOString().split("T")[0]}T${b.time}`);

      return dateA - dateB;
    });

    res.json(reminders);
  } catch (error) {
    console.error("Get reminders error:", error);

    res.status(500).json({
      message: "Error fetching reminders",
    });
  }
};