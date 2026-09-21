import { useEffect, useState } from "react";
import axios from "axios";
import "../../assets/css/AdminTests.css";

function AdminTests() {
  const [tests, setTests] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const [showForm, setShowForm] = useState(false);
  const [editingTest, setEditingTest] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    category: "Quantitative Aptitude",
    date: "",
    time: "",
    duration: 60,
    status: "Upcoming",
  });

  // Load tests
  const loadTests = async () => {
    try {
      const token = localStorage.getItem("adminToken");

      const res = await axios.get(
        "http://localhost:5000/api/admin/tests",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTests(res.data);
    } catch (error) {
      console.error("Error loading tests:", error);
    }
  };

  useEffect(() => {
    loadTests();
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
      title: "",
      category: "Quantitative Aptitude",
      date: "",
      time: "",
      duration: 60,
      status: "Upcoming",
    });

    setEditingTest(null);
  };

  // Save test
  const handleSaveTest = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("adminToken");

      const testData = {
        ...formData,
        duration: Number(formData.duration),
      };

      if (editingTest) {
        await axios.put(
          `http://localhost:5000/api/admin/tests/${editingTest._id}`,
          testData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        alert("Test updated successfully");
      } else {
        await axios.post(
          "http://localhost:5000/api/admin/tests",
          testData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        alert("Test added successfully");
      }

      setShowForm(false);
      resetForm();
      loadTests();
    } catch (error) {
      console.error("Save test error:", error);

      alert(
        error.response?.data?.message ||
          "Error saving test"
      );
    }
  };

  // Edit test
  const handleEditTest = (test) => {
    setFormData({
      title: test.title || "",
      category: test.category || "Quantitative Aptitude",
      date: test.date
        ? new Date(test.date).toISOString().split("T")[0]
        : "",
      time: test.time || "",
      duration: test.duration || 60,
      status: test.status || "Upcoming",
    });

    setEditingTest(test);
    setShowForm(true);
  };

  // Delete test
  const handleDeleteTest = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this test?"
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("adminToken");

      await axios.delete(
        `http://localhost:5000/api/admin/tests/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTests(
        tests.filter((test) => test._id !== id)
      );

      alert("Test deleted successfully");
    } catch (error) {
      console.error("Delete test error:", error);

      alert(
        error.response?.data?.message ||
          "Error deleting test"
      );
    }
  };

  // Search + category filter
  const filteredTests = tests.filter((test) => {
    const matchesSearch =
      test.title
        ?.toLowerCase()
        .includes(searchText.toLowerCase());

    const matchesCategory =
      categoryFilter === "all" ||
      test.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="admin-tests-page">

      {/* Header */}
      <div className="admin-tests-header">
        <div>
          <h1>Tests Management</h1>
          <p>Manage aptitude and coding tests</p>
        </div>

        <button
          className="add-test-btn"
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
        >
          <i className="fa-solid fa-plus"></i>
          Add Test
        </button>
      </div>

      {/* Summary */}
      <div className="tests-summary-card">
        <div className="tests-summary-icon">
          <i className="fa-solid fa-calendar-check"></i>
        </div>

        <div>
          <h2>{tests.length}</h2>
          <p>Total Tests</p>
        </div>
      </div>

      {/* Filters */}
      <div className="tests-filters">

        <div className="tests-search">
          <i className="fa-solid fa-magnifying-glass"></i>

          <input
            type="text"
            placeholder="Search by test title..."
            value={searchText}
            onChange={(e) =>
              setSearchText(e.target.value)
            }
          />
        </div>

        <select
          value={categoryFilter}
          onChange={(e) =>
            setCategoryFilter(e.target.value)
          }
        >
          <option value="all">
            All Categories
          </option>

          <option value="Quantitative Aptitude">
            Quantitative Aptitude
          </option>

          <option value="Logical Reasoning">
            Logical Reasoning
          </option>

          <option value="Verbal Ability">
            Verbal Ability
          </option>

          <option value="Coding">
            Coding
          </option>
        </select>

        <button
          className="clear-test-filter"
          onClick={() => {
            setSearchText("");
            setCategoryFilter("all");
          }}
        >
          <i className="fa-solid fa-rotate-left"></i>
          Clear
        </button>
      </div>

      {/* Table */}
      <div className="tests-table-container">

        {filteredTests.length === 0 ? (
          <div className="no-tests">
            <i className="fa-solid fa-calendar-xmark"></i>

            <h3>No tests found</h3>

            <p>
              Try changing your search or category
              filter.
            </p>
          </div>
        ) : (
          <table className="tests-table">

            <thead>
              <tr>
                <th>#</th>
                <th>Test Title</th>
                <th>Category</th>
                <th>Date</th>
                <th>Time</th>
                <th>Duration</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredTests.map(
                (test, index) => (
                  <tr key={test._id}>

                    <td>{index + 1}</td>

                    <td>
                      <strong>
                        {test.title}
                      </strong>
                    </td>

                    <td>
                      <span className="category-badge">
                        {test.category}
                      </span>
                    </td>

                    <td>
                      {test.date
                        ? new Date(
                            test.date
                          ).toLocaleDateString()
                        : "-"}
                    </td>

                    <td>
                      {test.time || "-"}
                    </td>

                    <td>
                      {test.duration || 0} mins
                    </td>

                    <td>
                      <span
                        className={`status-badge ${test.status?.toLowerCase()}`}
                      >
                        {test.status}
                      </span>
                    </td>

                    <td>
                      <div className="test-action-buttons">

                        <button
                          className="test-edit-btn"
                          onClick={() =>
                            handleEditTest(test)
                          }
                        >
                          <i className="fa-solid fa-pen"></i>
                        </button>

                        <button
                          className="test-delete-btn"
                          onClick={() =>
                            handleDeleteTest(
                              test._id
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
        <div className="test-modal-overlay">

          <div className="test-modal">

            <div className="test-modal-header">

              <div>
                <h2>
                  {editingTest
                    ? "Edit Test"
                    : "Add Test"}
                </h2>

                <p>
                  Enter the test schedule details
                </p>
              </div>

              <button
                className="test-close-btn"
                onClick={() => {
                  setShowForm(false);
                  resetForm();
                }}
              >
                <i className="fa-solid fa-xmark"></i>
              </button>

            </div>

            <form onSubmit={handleSaveTest}>

              <div className="test-form-grid">

                <div className="test-form-group">
                  <label>
                    Test Title
                  </label>

                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Example: TCS Aptitude Test"
                    required
                  />
                </div>

                <div className="test-form-group">
                  <label>
                    Category
                  </label>

                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                  >
                    <option value="Quantitative Aptitude">
                      Quantitative Aptitude
                    </option>

                    <option value="Logical Reasoning">
                      Logical Reasoning
                    </option>

                    <option value="Verbal Ability">
                      Verbal Ability
                    </option>

                    <option value="Coding">
                      Coding
                    </option>
                  </select>
                </div>

                <div className="test-form-group">
                  <label>
                    Date
                  </label>

                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="test-form-group">
                  <label>
                    Time
                  </label>

                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="test-form-group">
                  <label>
                    Duration (minutes)
                  </label>

                  <input
                    type="number"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    min="1"
                    required
                  />
                </div>

                <div className="test-form-group">
                  <label>
                    Status
                  </label>

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

              {/* Actions */}
              <div className="test-form-actions">

                <button
                  type="button"
                  className="test-cancel-btn"
                  onClick={() => {
                    setShowForm(false);
                    resetForm();
                  }}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="test-save-btn"
                >
                  <i className="fa-solid fa-floppy-disk"></i>

                  {editingTest
                    ? "Update Test"
                    : "Save Test"}
                </button>

              </div>

            </form>

          </div>
        </div>
      )}
    </div>
  );
}

export default AdminTests;