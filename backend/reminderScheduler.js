import Test from "./models/Test.js";
import CompanyInterview from "./models/CompanyInterview.js";
import User from "./models/User.js";
import Notification from "./models/Notification.js";

// ==========================================
// CREATE ONE REMINDER NOTIFICATION
// ==========================================

const createReminderNotification = async ({
  reminder,
  type,
  stage,
}) => {
  try {
    const users = await User.find({}, "_id");

    if (users.length === 0) {
      return;
    }

    let title = "";
    let message = "";

    // =========================
    // TEST
    // =========================

    if (type === "test") {
      if (stage === "30min") {
        title = "Upcoming Test";
        message = `Your ${reminder.title} will start in 30 minutes.`;
      }

      if (stage === "now") {
        title = "Test Started";
        message = `Your ${reminder.title} has started.`;
      }
    }

    // =========================
    // INTERVIEW
    // =========================

    if (type === "interview") {
      if (stage === "30min") {
        title = "Upcoming Interview";
        message = `Your ${reminder.companyName} interview will start in 30 minutes.`;
      }

      if (stage === "now") {
        title = "Interview Started";
        message = `Your ${reminder.companyName} interview has started.`;
      }
    }

    // =========================
    // CREATE FOR EACH USER
    // =========================

    for (const user of users) {
      const existingNotification = await Notification.findOne({
        userId: user._id,
        reminderId: reminder._id,
        reminderStage: stage,
        type: type,
      });

      // Prevent duplicate notification
      if (existingNotification) {
        continue;
      }

      await Notification.create({
        userId: user._id,
        title,
        message,
        type,
        reminderId: reminder._id,
        reminderStage: stage,
        isRead: false,
      });

      console.log(
        `🔔 ${type} ${stage} notification created for ${user._id}`
      );
    }
  } catch (error) {
    console.error("Create reminder notification error:", error);
  }
};

// ==========================================
// CREATE EXACT DATE + TIME
// ==========================================

const getScheduledDateTime = (date, time) => {
  const datePart = new Date(date)
    .toISOString()
    .split("T")[0];

  return new Date(`${datePart}T${time}:00`);
};

// ==========================================
// CHECK TEST REMINDERS
// ==========================================

const checkTestReminders = async () => {
  const tests = await Test.find();

  const now = new Date();

  for (const test of tests) {
    const scheduledTime = getScheduledDateTime(
      test.date,
      test.time
    );

    const differenceMs =
      scheduledTime.getTime() - now.getTime();

    const differenceMinutes =
      differenceMs / (1000 * 60);

    // Debug information
    console.log(
      `Test: ${test.title} | Scheduled: ${scheduledTime.toString()} | Remaining: ${differenceMinutes.toFixed(
        2
      )} minutes`
    );

    // =====================================
    // 30 MINUTE REMINDER
    // Only around the 30-minute point
    // =====================================

    if (
      differenceMinutes <= 30 &&
      differenceMinutes > 29
    ) {
      await createReminderNotification({
        reminder: test,
        type: "test",
        stage: "30min",
      });
    }

    // =====================================
    // EXACT START TIME
    // =====================================

    if (
      differenceMinutes <= 0 &&
      differenceMinutes > -1
    ) {
      await createReminderNotification({
        reminder: test,
        type: "test",
        stage: "now",
      });
    }
  }
};

// ==========================================
// CHECK INTERVIEW REMINDERS
// ==========================================

const checkInterviewReminders = async () => {
  const interviews = await CompanyInterview.find();

  const now = new Date();

  for (const interview of interviews) {
    const scheduledTime = getScheduledDateTime(
      interview.date,
      interview.time
    );

    const differenceMs =
      scheduledTime.getTime() - now.getTime();

    const differenceMinutes =
      differenceMs / (1000 * 60);

    // Debug information
    console.log(
      `Interview: ${interview.companyName} | Scheduled: ${scheduledTime.toString()} | Remaining: ${differenceMinutes.toFixed(
        2
      )} minutes`
    );

    // =====================================
    // 30 MINUTE REMINDER
    // =====================================

    if (
      differenceMinutes <= 30 &&
      differenceMinutes > 29
    ) {
      await createReminderNotification({
        reminder: interview,
        type: "interview",
        stage: "30min",
      });
    }

    // =====================================
    // EXACT START TIME
    // =====================================

    if (
      differenceMinutes <= 0 &&
      differenceMinutes > -1
    ) {
      await createReminderNotification({
        reminder: interview,
        type: "interview",
        stage: "now",
      });
    }
  }
};

// ==========================================
// MAIN SCHEDULER
// ==========================================

const checkReminders = async () => {
  try {
    await checkTestReminders();
    await checkInterviewReminders();
  } catch (error) {
    console.error("Reminder checker error:", error);
  }
};

// ==========================================
// START SCHEDULER
// ==========================================

export const startReminderScheduler = () => {
  console.log("⏰ Reminder scheduler started");

  // Check immediately
  checkReminders();

  // Check every 10 seconds
  setInterval(() => {
    checkReminders();
  }, 10 * 1000);
};