import { useEffect, useState } from "react";
import axios from "axios";
import "../../assets/css/AdminInterviews.css";

function AdminInterviews() {
  const [interviews, setInterviews] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [showForm, setShowForm] = useState(false);
  const [editingInterview, setEditingInterview] = useState(null);

  const [formData, setFormData] = useState({
    companyName: "",
    role: "",
    date: "",
    time: "",
    location: "Online",
    status: "Upcoming",
  });

  // Load interviews
  const loadInterviews = async () => {
    try {
      const token = localStorage.getItem("adminToken");

      const res = await axios.get(
        "http://localhost:5000/api/admin/interviews",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setInterviews(res.data);
    } catch (error) {
      console.error("Error loading interviews:", error);
    }
  };

  useEffect(() => {
    loadInterviews();
  }, []);

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      companyName: "",
      role: "",
      date: "",
      time: "",
      location: "Online",
      status: "Upcoming",
    });

    setEditingInterview(null);
  };

  // Save interview
  const handleSaveInterview = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("adminToken");

      if (editingInterview) {
        await axios.put(
          `http://localhost:5000/api/admin/interviews/${editingInterview._id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        alert("Interview updated successfully");
      } else {
        await axios.post(
          "http://localhost:5000/api/admin/interviews",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        alert("Interview added successfully");
      }

      setShowForm(false);
      resetForm();
      loadInterviews();
    } catch (error) {
      console.error("Save interview error:", error);

      alert(
        error.response?.data?.message ||
          "Error saving interview"
      );
    }
  };

  // Edit interview
  const handleEditInterview = (interview) => {
    setFormData({
      companyName: interview.companyName || "",
      role: interview.role || "",
      date: interview.date
        ? new Date(interview.date)
            .toISOString()
            .split("T")[0]
        : "",
      time: interview.time || "",
      location: interview.location || "Online",
      status: interview.status || "Upcoming",
    });

    setEditingInterview(interview);
    setShowForm(true);
  };

  // Delete interview
  const handleDeleteInterview = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this interview?"
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("adminToken");

      await axios.delete(
        `http://localhost:5000/api/admin/interviews/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setInterviews(
        interviews.filter(
          (interview) => interview._id !== id
        )
      );

      alert("Interview deleted successfully");
    } catch (error) {
      console.error(
        "Delete interview error:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Error deleting interview"
      );
    }
  };

  // Search + filter
  const filteredInterviews = interviews.filter(
    (interview) => {
      const search = searchText.toLowerCase();

      const matchesSearch =
        interview.companyName
          ?.toLowerCase()
          .includes(search) ||
        interview.role
          ?.toLowerCase()
          .includes(search) ||
        interview.location
          ?.toLowerCase()
          .includes(search);

      const matchesStatus =
        statusFilter === "all" ||
        interview.status === statusFilter;

      return matchesSearch && matchesStatus;
    }
  );

  return (
    <div className="admin-interviews-page">

      {/* Header */}
      <div className="admin-interviews-header">
        <div>
          <h1>Interview Management</h1>
          <p>
            Manage company interview schedules
          </p>
        </div>

        <button
          className="add-interview-btn"
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
        >
          <i className="fa-solid fa-plus"></i>
          Add Interview
        </button>
      </div>

      {/* Summary */}
      <div className="interviews-summary-card">
        <div className="interviews-summary-icon">
          <i className="fa-solid fa-building"></i>
        </div>

        <div>
          <h2>{interviews.length}</h2>
          <p>Total Interviews</p>
        </div>
      </div>

      {/* Filters */}
      <div className="interviews-filters">

        <div className="interviews-search">
          <i className="fa-solid fa-magnifying-glass"></i>

          <input
            type="text"
            placeholder="Search company, role or location..."
            value={searchText}
            onChange={(e) =>
              setSearchText(e.target.value)
            }
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value)
          }
        >
          <option value="all">
            All Status
          </option>

          <option value="Upcoming">
            Upcoming
          </option>

          <option value="Ongoing">
            Ongoing
          </option>

          <option value="Completed">
            Completed
          </option>
        </select>

        <button
          className="clear-interview-filter"
          onClick={() => {
            setSearchText("");
            setStatusFilter("all");
          }}
        >
          <i className="fa-solid fa-rotate-left"></i>
          Clear
        </button>

      </div>

      {/* Table */}
      <div className="interviews-table-container">

        {filteredInterviews.length === 0 ? (
          <div className="no-interviews">

            <i className="fa-solid fa-building-circle-xmark"></i>

            <h3>No interviews found</h3>

            <p>
              Try changing your search or status
              filter.
            </p>

          </div>
        ) : (
          <table className="interviews-table">

            <thead>
              <tr>
                <th>#</th>
                <th>Company</th>
                <th>Role</th>
                <th>Date</th>
                <th>Time</th>
                <th>Location</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredInterviews.map(
                (interview, index) => (
                  <tr key={interview._id}>

                    <td>{index + 1}</td>

                    <td>
                      <strong>
                        {interview.companyName}
                      </strong>
                    </td>

                    <td>
                      {interview.role}
                    </td>

                    <td>
                      {interview.date
                        ? new Date(
                            interview.date
                          ).toLocaleDateString()
                        : "-"}
                    </td>

                    <td>
                      {interview.time || "-"}
                    </td>

                    <td>
                      <span className="location-badge">
                        <i className="fa-solid fa-location-dot"></i>
                        {interview.location ||
                          "Online"}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`interview-status-badge ${interview.status?.toLowerCase()}`}
                      >
                        {interview.status}
                      </span>
                    </td>

                    <td>
                      <div className="interview-action-buttons">

                        <button
                          className="interview-edit-btn"
                          onClick={() =>
                            handleEditInterview(
                              interview
                            )
                          }
                        >
                          <i className="fa-solid fa-pen"></i>
                        </button>

                        <button
                          className="interview-delete-btn"
                          onClick={() =>
                            handleDeleteInterview(
                              interview._id
                            )
                          }
                        >
                          <i className="fa-solid fa-trash"></i>
                        </button>

                      </div>
                    </td>

                  </tr>
                )
              )}
            </tbody>

          </table>
        )}

      </div>

      {/* Add / Edit Modal */}
      {showForm && (
        <div className="interview-modal-overlay">

          <div className="interview-modal">

            <div className="interview-modal-header">

              <div>
                <h2>
                  {editingInterview
                    ? "Edit Interview"
                    : "Add Interview"}
                </h2>

                <p>
                  Enter the company interview details
                </p>
              </div>

              <button
                className="interview-close-btn"
                onClick={() => {
                  setShowForm(false);
                  resetForm();
                }}
              >
                <i className="fa-solid fa-xmark"></i>
              </button>

            </div>

            <form onSubmit={handleSaveInterview}>

              <div className="interview-form-grid">

                <div className="interview-form-group">
                  <label>Company Name</label>

                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="Example: TCS"
                    required
                  />
                </div>

                <div className="interview-form-group">
                  <label>Job Role</label>

                  <input
                    type="text"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    placeholder="Example: Software Developer"
                    required
                  />
                </div>

                <div className="interview-form-group">
                  <label>Date</label>

                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="interview-form-group">
                  <label>Time</label>

                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="interview-form-group">
                  <label>Location</label>

                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Example: Online / Chennai"
                  />
                </div>

                <div className="interview-form-group">
                  <label>Status</label>

                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="Upcoming">
                      Upcoming
                    </option>

                    <option value="Ongoing">
                      Ongoing
                    </option>

                    <option value="Completed">
                      Completed
                    </option>
                  </select>
                </div>

              </div>

              <div className="interview-form-actions">

                <button
                  type="button"
                  className="interview-cancel-btn"
                  onClick={() => {
                    setShowForm(false);
                    resetForm();
                  }}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="interview-save-btn"
                >
                  <i className="fa-solid fa-floppy-disk"></i>

                  {editingInterview
                    ? "Update Interview"
                    : "Save Interview"}
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
}

export default AdminInterviews;