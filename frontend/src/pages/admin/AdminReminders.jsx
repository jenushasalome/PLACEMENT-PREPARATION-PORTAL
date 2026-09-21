import { useEffect, useState } from "react";
import axios from "axios";
import "../../assets/css/AdminReminders.css";

function AdminReminders() {
  const [reminders, setReminders] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const loadReminders = async () => {
    try {
      const token = localStorage.getItem("adminToken");

      const res = await axios.get(
        "http://localhost:5000/api/admin/reminders",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setReminders(res.data);
    } catch (error) {
      console.error("Error loading reminders:", error);
    }
  };

  useEffect(() => {
    loadReminders();
  }, []);

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const filteredReminders = reminders.filter((reminder) => {
    const search = searchText.toLowerCase();

    const matchesSearch =
      reminder.title?.toLowerCase().includes(search) ||
      reminder.category?.toLowerCase().includes(search);

    const matchesType =
      typeFilter === "all" ||
      reminder.type === typeFilter;

    const matchesStatus =
      statusFilter === "all" ||
      reminder.status === statusFilter;

    return (
      matchesSearch &&
      matchesType &&
      matchesStatus
    );
  });

  const testCount = reminders.filter(
    (reminder) => reminder.type === "Test"
  ).length;

  const interviewCount = reminders.filter(
    (reminder) => reminder.type === "Interview"
  ).length;

  const upcomingCount = reminders.filter(
    (reminder) => reminder.status === "Upcoming"
  ).length;

  return (
    <div className="admin-reminders-page">

      {/* HEADER */}
      <div className="admin-reminders-header">
        <div>
          <h1>Reminder Management</h1>
          <p>
            View scheduled tests and company interviews
          </p>
        </div>
      </div>

      {/* SUMMARY CARDS */}
      <div className="reminder-summary-grid">

        <div className="reminder-summary-card">
          <div className="reminder-summary-icon">
            <i className="fa-solid fa-bell"></i>
          </div>

          <div>
            <h2>{reminders.length}</h2>
            <p>Total Reminders</p>
          </div>
        </div>

        <div className="reminder-summary-card">
          <div className="reminder-summary-icon test-icon">
            <i className="fa-solid fa-file-lines"></i>
          </div>

          <div>
            <h2>{testCount}</h2>
            <p>Tests</p>
          </div>
        </div>

        <div className="reminder-summary-card">
          <div className="reminder-summary-icon interview-icon">
            <i className="fa-solid fa-building"></i>
          </div>

          <div>
            <h2>{interviewCount}</h2>
            <p>Interviews</p>
          </div>
        </div>

        <div className="reminder-summary-card">
          <div className="reminder-summary-icon upcoming-icon">
            <i className="fa-solid fa-clock"></i>
          </div>

          <div>
            <h2>{upcomingCount}</h2>
            <p>Upcoming</p>
          </div>
        </div>

      </div>

      {/* FILTERS */}
      <div className="reminder-filters">

        <div className="reminder-search">
          <i className="fa-solid fa-magnifying-glass"></i>

          <input
            type="text"
            placeholder="Search test, company or role..."
            value={searchText}
            onChange={(e) =>
              setSearchText(e.target.value)
            }
          />
        </div>

        <select
          value={typeFilter}
          onChange={(e) =>
            setTypeFilter(e.target.value)
          }
        >
          <option value="all">All Types</option>
          <option value="Test">Tests</option>
          <option value="Interview">Interviews</option>
        </select>

        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value)
          }
        >
          <option value="all">All Status</option>
          <option value="Upcoming">Upcoming</option>
          <option value="Ongoing">Ongoing</option>
          <option value="Completed">Completed</option>
        </select>

        <button
          className="clear-reminder-filter"
          onClick={() => {
            setSearchText("");
            setTypeFilter("all");
            setStatusFilter("all");
          }}
        >
          <i className="fa-solid fa-rotate-left"></i>
          Clear
        </button>

      </div>

      {/* TABLE */}
      <div className="reminders-table-container">

        {filteredReminders.length === 0 ? (

          <div className="no-reminders">

            <i className="fa-regular fa-bell"></i>

            <h3>No reminders found</h3>

            <p>
              Try changing your search or filters.
            </p>

          </div>

        ) : (

          <table className="reminders-table">

            <thead>
              <tr>
                <th>#</th>
                <th>Type</th>
                <th>Title / Company</th>
                <th>Category / Role</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>

              {filteredReminders.map(
                (reminder, index) => (

                  <tr key={`${reminder.type}-${reminder._id}`}>

                    <td>{index + 1}</td>

                    <td>
                      <span
                        className={`reminder-type-badge ${
                          reminder.type === "Test"
                            ? "test"
                            : "interview"
                        }`}
                      >
                        {reminder.type === "Test" ? (
                          <>
                            <i className="fa-solid fa-file-lines"></i>
                            Test
                          </>
                        ) : (
                          <>
                            <i className="fa-solid fa-building"></i>
                            Interview
                          </>
                        )}
                      </span>
                    </td>

                    <td>
                      <strong>
                        {reminder.title}
                      </strong>
                    </td>

                    <td>
                      {reminder.category || "-"}
                    </td>

                    <td>
                      {formatDate(reminder.date)}
                    </td>

                    <td>
                      {reminder.time || "-"}
                    </td>

                    <td>
                      <span
                        className={`reminder-status-badge ${
                          reminder.status?.toLowerCase()
                        }`}
                      >
                        {reminder.status}
                      </span>
                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        )}

      </div>

    </div>
  );
}

export default AdminReminders;