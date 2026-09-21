import { useEffect, useState } from "react";
import axios from "axios";
import "../../assets/css/AdminCoding.css";

function AdminCoding() {
  const [questions, setQuestions] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    difficulty: "Easy",
    topic: "",
    points: 10,
    description: "",
    inputFormat: "",
    outputFormat: "",
    constraints: "",
    sampleInput: "",
    sampleOutput: "",
    explanation: "",
    starterCode: {
      java: "",
      python: "",
      cpp: "",
      c: "",
    },
    hiddenTestCases: [
      {
        input: "",
        output: "",
      },
    ],
  });

  const loadQuestions = async () => {
    try {
      const token = localStorage.getItem("adminToken");
    console.log("Admin token:", token);
      const res = await axios.get(
        "http://localhost:5000/api/admin/coding",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setQuestions(res.data);
    } catch (error) {
      console.error("Error loading coding questions:", error);
    }
  };

  useEffect(() => {
    loadQuestions();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleStarterCodeChange = (language, value) => {
    setFormData({
      ...formData,
      starterCode: {
        ...formData.starterCode,
        [language]: value,
      },
    });
  };

  const handleTestCaseChange = (index, field, value) => {
    const updatedTestCases = [...formData.hiddenTestCases];

    updatedTestCases[index][field] = value;

    setFormData({
      ...formData,
      hiddenTestCases: updatedTestCases,
    });
  };

  const addTestCase = () => {
    setFormData({
      ...formData,
      hiddenTestCases: [
        ...formData.hiddenTestCases,
        {
          input: "",
          output: "",
        },
      ],
    });
  };

  const removeTestCase = (index) => {
    const updatedTestCases = formData.hiddenTestCases.filter(
      (_, i) => i !== index
    );

    setFormData({
      ...formData,
      hiddenTestCases: updatedTestCases,
    });
  };

  const resetForm = () => {
    setFormData({
      title: "",
      difficulty: "Easy",
      topic: "",
      points: 10,
      description: "",
      inputFormat: "",
      outputFormat: "",
      constraints: "",
      sampleInput: "",
      sampleOutput: "",
      explanation: "",
      starterCode: {
        java: "",
        python: "",
        cpp: "",
        c: "",
      },
      hiddenTestCases: [
        {
          input: "",
          output: "",
        },
      ],
    });

    setEditingQuestion(null);
  };

  const handleSaveQuestion = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("adminToken");

      const questionData = {
        ...formData,
        points: Number(formData.points),
      };

      if (editingQuestion) {
        await axios.put(
          `http://localhost:5000/api/admin/coding/${editingQuestion._id}`,
          questionData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        await axios.post(
          "http://localhost:5000/api/admin/coding",
          questionData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      alert(
        editingQuestion
          ? "Coding question updated successfully"
          : "Coding question added successfully"
      );

      resetForm();
      setShowForm(false);
      loadQuestions();
    } catch (error) {
      console.error("Save coding question error:", error);

      alert(
        error.response?.data?.message ||
          "Error saving coding question"
      );
    }
  };

  const handleEditQuestion = (question) => {
    setFormData({
      title: question.title || "",
      difficulty: question.difficulty || "Easy",
      topic: question.topic || "",
      points: question.points || 10,
      description: question.description || "",
      inputFormat: question.inputFormat || "",
      outputFormat: question.outputFormat || "",
      constraints: question.constraints || "",
      sampleInput: question.sampleInput || "",
      sampleOutput: question.sampleOutput || "",
      explanation: question.explanation || "",
      starterCode: {
        java: question.starterCode?.java || "",
        python: question.starterCode?.python || "",
        cpp: question.starterCode?.cpp || "",
        c: question.starterCode?.c || "",
      },
      hiddenTestCases:
        question.hiddenTestCases?.length > 0
          ? question.hiddenTestCases
          : [{ input: "", output: "" }],
    });

    setEditingQuestion(question);
    setShowForm(true);
  };

  const handleDeleteQuestion = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this coding question?"
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("adminToken");

      await axios.delete(
        `http://localhost:5000/api/admin/coding/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setQuestions(
        questions.filter((question) => question._id !== id)
      );

      alert("Coding question deleted successfully");
    } catch (error) {
      console.error("Delete coding question error:", error);

      alert(
        error.response?.data?.message ||
          "Error deleting coding question"
      );
    }
  };

  const filteredQuestions = questions.filter((question) => {
    const matchesSearch =
      question.title
        ?.toLowerCase()
        .includes(searchText.toLowerCase()) ||
      question.topic
        ?.toLowerCase()
        .includes(searchText.toLowerCase());

    const matchesDifficulty =
      difficultyFilter === "all" ||
      question.difficulty === difficultyFilter;

    return matchesSearch && matchesDifficulty;
  });

  return (
    <div className="admin-coding-page">

      <div className="admin-coding-header">
        <div>
          <h1>Coding Questions</h1>
          <p>Manage coding practice questions</p>
        </div>

        <button
          className="add-coding-btn"
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
        >
          <i className="fa-solid fa-plus"></i>
          Add Coding Question
        </button>
      </div>

      <div className="coding-summary-card">
        <div className="coding-summary-icon">
          <i className="fa-solid fa-code"></i>
        </div>

        <div>
          <h2>{questions.length}</h2>
          <p>Total Coding Questions</p>
        </div>
      </div>

      <div className="coding-filters">

        <div className="coding-search">
          <i className="fa-solid fa-magnifying-glass"></i>

          <input
            type="text"
            placeholder="Search by title or topic..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>

        <select
          value={difficultyFilter}
          onChange={(e) =>
            setDifficultyFilter(e.target.value)
          }
        >
          <option value="all">All Difficulties</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>

        <button
          className="clear-coding-filter"
          onClick={() => {
            setSearchText("");
            setDifficultyFilter("all");
          }}
        >
          <i className="fa-solid fa-rotate-left"></i>
          Clear
        </button>

      </div>

      <div className="coding-table-container">

        {filteredQuestions.length === 0 ? (
          <div className="no-coding-questions">
            <i className="fa-solid fa-code"></i>
            <h3>No coding questions found</h3>
            <p>
              Try changing your search or difficulty filter.
            </p>
          </div>
        ) : (
          <table className="coding-table">

            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Topic</th>
                <th>Difficulty</th>
                <th>Points</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredQuestions.map((question, index) => (
                <tr key={question._id}>

                  <td>{index + 1}</td>

                  <td>
                    <strong>{question.title}</strong>
                  </td>

                  <td>
                    {question.topic || "-"}
                  </td>

                  <td>
                    <span
                      className={`difficulty-badge ${question.difficulty?.toLowerCase()}`}
                    >
                      {question.difficulty}
                    </span>
                  </td>

                  <td>
                    {question.points || 0}
                  </td>

                  <td>
                    <div className="coding-action-buttons">

                      <button
                        className="coding-edit-btn"
                        onClick={() =>
                          handleEditQuestion(question)
                        }
                      >
                        <i className="fa-solid fa-pen"></i>
                      </button>

                      <button
                        className="coding-delete-btn"
                        onClick={() =>
                          handleDeleteQuestion(question._id)
                        }
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>

                    </div>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        )}

      </div>

      {showForm && (
        <div className="coding-modal-overlay">

          <div className="coding-modal">

            <div className="coding-modal-header">
              <div>
                <h2>
                  {editingQuestion
                    ? "Edit Coding Question"
                    : "Add Coding Question"}
                </h2>

                <p>
                  Enter the coding problem details
                </p>
              </div>

              <button
                className="coding-close-btn"
                onClick={() => {
                  setShowForm(false);
                  resetForm();
                }}
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            <form onSubmit={handleSaveQuestion}>

              <div className="coding-form-grid">

                <div className="coding-form-group">
                  <label>Problem Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter problem title"
                    required
                  />
                </div>

                <div className="coding-form-group">
                  <label>Topic</label>
                  <input
                    type="text"
                    name="topic"
                    value={formData.topic}
                    onChange={handleChange}
                    placeholder="Example: Arrays"
                  />
                </div>

                <div className="coding-form-group">
                  <label>Difficulty</label>

                  <select
                    name="difficulty"
                    value={formData.difficulty}
                    onChange={handleChange}
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>

                <div className="coding-form-group">
                  <label>Points</label>

                  <input
                    type="number"
                    name="points"
                    value={formData.points}
                    onChange={handleChange}
                    min="1"
                  />
                </div>

              </div>

              <div className="coding-form-group">
                <label>Description</label>

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe the problem..."
                  rows="5"
                  required
                />
              </div>

              <div className="coding-form-group">
                <label>Input Format</label>

                <textarea
                  name="inputFormat"
                  value={formData.inputFormat}
                  onChange={handleChange}
                  placeholder="Describe the input format..."
                  rows="3"
                />
              </div>

              <div className="coding-form-group">
                <label>Output Format</label>

                <textarea
                  name="outputFormat"
                  value={formData.outputFormat}
                  onChange={handleChange}
                  placeholder="Describe the output format..."
                  rows="3"
                />
              </div>

              <div className="coding-form-group">
                <label>Constraints</label>

                <textarea
                  name="constraints"
                  value={formData.constraints}
                  onChange={handleChange}
                  placeholder="Example: 1 <= n <= 1000"
                  rows="3"
                />
              </div>

              <div className="coding-sample-grid">

                <div className="coding-form-group">
                  <label>Sample Input</label>

                  <textarea
                    name="sampleInput"
                    value={formData.sampleInput}
                    onChange={handleChange}
                    placeholder="Example input"
                    rows="4"
                  />
                </div>

                <div className="coding-form-group">
                  <label>Sample Output</label>

                  <textarea
                    name="sampleOutput"
                    value={formData.sampleOutput}
                    onChange={handleChange}
                    placeholder="Expected output"
                    rows="4"
                  />
                </div>

              </div>

              <div className="coding-form-group">
                <label>Explanation</label>

                <textarea
                  name="explanation"
                  value={formData.explanation}
                  onChange={handleChange}
                  placeholder="Explain the solution..."
                  rows="4"
                />
              </div>

              <div className="starter-code-section">

                <h3>Starter Code</h3>

                <div className="coding-form-group">
                  <label>Java</label>

                  <textarea
                    value={formData.starterCode.java}
                    onChange={(e) =>
                      handleStarterCodeChange(
                        "java",
                        e.target.value
                      )
                    }
                    placeholder="Java starter code"
                    rows="5"
                  />
                </div>

                <div className="coding-form-group">
                  <label>Python</label>

                  <textarea
                    value={formData.starterCode.python}
                    onChange={(e) =>
                      handleStarterCodeChange(
                        "python",
                        e.target.value
                      )
                    }
                    placeholder="Python starter code"
                    rows="5"
                  />
                </div>

                <div className="coding-form-group">
                  <label>C++</label>

                  <textarea
                    value={formData.starterCode.cpp}
                    onChange={(e) =>
                      handleStarterCodeChange(
                        "cpp",
                        e.target.value
                      )
                    }
                    placeholder="C++ starter code"
                    rows="5"
                  />
                </div>

                <div className="coding-form-group">
                  <label>C</label>

                  <textarea
                    value={formData.starterCode.c}
                    onChange={(e) =>
                      handleStarterCodeChange(
                        "c",
                        e.target.value
                      )
                    }
                    placeholder="C starter code"
                    rows="5"
                  />
                </div>

              </div>

              <div className="hidden-test-section">

                <div className="hidden-test-header">
                  <h3>Hidden Test Cases</h3>

                  <button
                    type="button"
                    className="add-testcase-btn"
                    onClick={addTestCase}
                  >
                    <i className="fa-solid fa-plus"></i>
                    Add Test Case
                  </button>
                </div>

                {formData.hiddenTestCases.map(
                  (testCase, index) => (
                    <div
                      className="hidden-test-case"
                      key={index}
                    >

                      <div className="test-case-title">
                        Test Case {index + 1}

                        {formData.hiddenTestCases.length >
                          1 && (
                          <button
                            type="button"
                            onClick={() =>
                              removeTestCase(index)
                            }
                          >
                            <i className="fa-solid fa-trash"></i>
                          </button>
                        )}
                      </div>

                      <div className="coding-sample-grid">

                        <div className="coding-form-group">
                          <label>Input</label>

                          <textarea
                            value={testCase.input}
                            onChange={(e) =>
                              handleTestCaseChange(
                                index,
                                "input",
                                e.target.value
                              )
                            }
                            rows="3"
                          />
                        </div>

                        <div className="coding-form-group">
                          <label>Expected Output</label>

                          <textarea
                            value={testCase.output}
                            onChange={(e) =>
                              handleTestCaseChange(
                                index,
                                "output",
                                e.target.value
                              )
                            }
                            rows="3"
                          />
                        </div>

                      </div>

                    </div>
                  )
                )}

              </div>

              <div className="coding-form-actions">

                <button
                  type="button"
                  className="coding-cancel-btn"
                  onClick={() => {
                    setShowForm(false);
                    resetForm();
                  }}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="coding-save-btn"
                >
                  <i className="fa-solid fa-floppy-disk"></i>

                  {editingQuestion
                    ? "Update Question"
                    : "Save Question"}
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
}

export default AdminCoding;