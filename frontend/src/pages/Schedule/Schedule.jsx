import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { useState, useEffect } from "react";
import "../../assets/css/Schedule.css";
import ScheduleModal from "./ScheduleModal";
import {
  addTest,
  addInterview,
  updateTest,
  updateInterview,
  getTests,
  getInterviews,
  deleteTest,
  deleteInterview,
} from "../../services/scheduleService";

function Schedule() {
  const [collapsed, setCollapsed] = useState(false);
  const [showModal, setShowModal] = useState(false);
const [tests, setTests] = useState([]);
const [interviews, setInterviews] = useState([]);
const [editingType, setEditingType] = useState(null);

const [editingItem, setEditingItem] = useState(null);
useEffect(() => {
  loadData();
}, []);
const loadData = async () => {
  try {
    const testData = await getTests();
    const interviewData = await getInterviews();

    setTests(testData);
    setInterviews(interviewData);
  } catch (error) {
    console.log(error);
  }
};
const handleDeleteTest = async (id) => {
  if (!window.confirm("Are you sure you want to delete this item?")) {
  return;
}
  try {
    await deleteTest(id);

    loadData();
  } catch (error) {
    console.log(error);
  }
};

const handleDeleteInterview = async (id) => {
  if (!window.confirm("Are you sure you want to delete this item?")) {
  return;
}
  try {
    await deleteInterview(id);

    loadData();
  } catch (error) {
    console.log(error);
  }
};
const handleEditTest = (test) => {
  setEditingType("test");

  setEditingItem(test);

  setShowModal(true);
};

const handleEditInterview = (interview) => {
  setEditingType("interview");

  setEditingItem(interview);

  setShowModal(true);
};

  return (
    <>
      <Navbar />

      <div className="dashboard-container">

        <Sidebar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />

       <div className="dashboard-content">

  <div className="schedule-header">

    <h1>Reminders Management</h1>

    <button
  className="add-btn"
  onClick={() => setShowModal(true)}
>
      <i className="fa-solid fa-plus"></i>
      Add Reminder
    </button>

  </div>

  {/* Upcoming Tests */}

<div className="schedule-section">

  <h2>Upcoming Tests</h2>

  <table className="schedule-table">

    <thead>
      <tr>
        <th>Title</th>
        <th>Date</th>
        <th>Time</th>
        <th>Actions</th>
      </tr>
    </thead>

    <tbody>

      {tests.length === 0 ? (

        <tr>
          <td colSpan="4">No Tests Available</td>
        </tr>

      ) : (

        tests.map((test) => (

          <tr key={test._id}>

            <td>{test.title}</td>

            <td>
              {new Date(test.date).toLocaleDateString()}
            </td>

            <td>{test.time}</td>

            <td>

              <button
  className="edit-btn"
  onClick={() => handleEditTest(test)}
>
  Edit
</button>

              <button
                className="delete-btn"
                onClick={() =>
                  handleDeleteTest(test._id)
                }
              >
                Delete
              </button>

            </td>

          </tr>

        ))

      )}

    </tbody>

  </table>

</div>

{/* Company Interviews */}

<div className="schedule-section">

  <h2>Company Interviews</h2>

  <table className="schedule-table">

    <thead>

      <tr>
        <th>Company</th>
        <th>Role</th>
        <th>Date</th>
        <th>Time</th>
        <th>Actions</th>
      </tr>

    </thead>

    <tbody>

      {interviews.length === 0 ? (

        <tr>
          <td colSpan="5">
            No Interviews Available
          </td>
        </tr>

      ) : (

        interviews.map((interview) => (

          <tr key={interview._id}>

            <td>{interview.companyName}</td>

            <td>{interview.role}</td>

            <td>
              {new Date(
                interview.date
              ).toLocaleDateString()}
            </td>

            <td>{interview.time}</td>

            <td>

              <button
  className="edit-btn"
  onClick={() =>
    handleEditInterview(interview)
  }
>
  Edit
</button>

              <button
                className="delete-btn"
                onClick={() =>
                  handleDeleteInterview(
                    interview._id
                  )
                }
              >
                Delete
              </button>

            </td>

          </tr>

        ))

      )}

    </tbody>

  </table>

</div>

</div>
      </div>
      {
  showModal && (
    <ScheduleModal
    editingItem={editingItem}
  editingType={editingType}
  onClose={() =>{
    setShowModal(false);
    setEditingItem(null);
    setEditingType(null);
  }}
  onSave={async (type, data) => {
  try {

    if (type === "test") {

      const testData = {
        title: data.title,
        category: data.category,
        date: data.date,
        time: data.time,
        duration: parseInt(data.duration),
        status: "Upcoming",
      };

      if (editingItem) {
        await updateTest(editingItem._id, testData);
      } else {
        await addTest(testData);
      }

    } else {

      const interviewData = {
        companyName: data.companyName,
        role: data.role,
        date: data.date,
        time: data.time,
        location: data.location,
        status: "Upcoming",
      };

      if (editingItem) {
        await updateInterview(
          editingItem._id,
          interviewData
        );
      } else {
        await addInterview(interviewData);
      }

    }

    loadData();

    setShowModal(false);

    setEditingItem(null);

    setEditingType(null);

  } catch (error) {
    console.log(error);
  }
}}
/>
  )
}

    </>
  );
}

export default Schedule;