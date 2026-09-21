import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../assets/css/AdminAptitude.css";

function AdminAptitude() {
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [searchText, setSearchText] = useState("");
const [categoryFilter, setCategoryFilter] = useState("all");
const [difficultyFilter, setDifficultyFilter] = useState("all");

const [formData, setFormData] = useState({
  category: "quantitative",
  difficulty: "easy",
  question: "",
  options: ["", "", "", ""],
  answer: 0,
  explanation: "",
});

  const loadQuestions = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("adminToken");

      if (!token) {
        navigate("/admin/login");
        return;
      }

      const response = await axios.get(
        "http://localhost:5000/api/admin/aptitude",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setQuestions(response.data);
    } catch (error) {
      console.error(
        "Get aptitude questions error:",
        error
      );

      if (error.response?.status === 401) {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("admin");
        navigate("/admin/login");
        return;
      }

      setError(
        error.response?.data?.message ||
          "Unable to load aptitude questions."
      );
    } finally {
      setLoading(false);
    }
  };
  const handleFormChange = (e) => {
  const { name, value } = e.target;

  setFormData((previous) => ({
    ...previous,
    [name]: value,
  }));
};

const handleOptionChange = (index, value) => {
  setFormData((previous) => {
    const updatedOptions = [...previous.options];

    updatedOptions[index] = value;

    return {
      ...previous,
      options: updatedOptions,
    };
  });
};

const handleSaveQuestion = async (e) => {
  e.preventDefault();

  try {
    const token = localStorage.getItem("adminToken");

    const questionData = {
      ...formData,
      answer: Number(formData.answer),
    };

    if (editingQuestion) {
      await axios.put(
        `http://localhost:5000/api/admin/aptitude/${editingQuestion._id}`,
        questionData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } else {
      await axios.post(
        "http://localhost:5000/api/admin/aptitude",
        questionData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    }

    setFormData({
      category: "quantitative",
      difficulty: "easy",
      question: "",
      options: ["", "", "", ""],
      answer: 0,
      explanation: "",
    });

    setEditingQuestion(null);
    setShowForm(false);

    loadQuestions();

  } catch (error) {
    console.error(
      "Save aptitude question error:",
      error
    );

    alert(
      error.response?.data?.message ||
        "Unable to save question."
    );
  }
};
const handleEditQuestion = (question) => {
  setEditingQuestion(question);

  setFormData({
    category: question.category,
    difficulty: question.difficulty,
    question: question.question,
    options: question.options || ["", "", "", ""],
    answer: question.answer,
    explanation: question.explanation || "",
  });

  setShowForm(true);
};
const handleDeleteQuestion = async (id) => {
  const confirmed = window.confirm(
    "Are you sure you want to delete this question?"
  );

  if (!confirmed) return;

  try {
    const token = localStorage.getItem("adminToken");

    await axios.delete(
      `http://localhost:5000/api/admin/aptitude/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setQuestions((previousQuestions) =>
      previousQuestions.filter(
        (question) => question._id !== id
      )
    );

  } catch (error) {
    console.error(
      "Delete aptitude question error:",
      error
    );

    alert(
      error.response?.data?.message ||
        "Unable to delete question."
    );
  }
};


  useEffect(() => {
    loadQuestions();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("admin");
    navigate("/admin/login");
  };
  const filteredQuestions = questions.filter((question) => {
  const matchesSearch = question.question
    .toLowerCase()
    .includes(searchText.toLowerCase());

  const matchesCategory =
    categoryFilter === "all" ||
    question.category === categoryFilter;

  const matchesDifficulty =
    difficultyFilter === "all" ||
    question.difficulty === difficultyFilter;

  return (
    matchesSearch &&
    matchesCategory &&
    matchesDifficulty
  );
});


  return (
    <div className="admin-aptitude-page">

      {/* SIDEBAR */}
      <aside className="admin-aptitude-sidebar">

        <div className="admin-aptitude-logo">
          <i className="fa-solid fa-user-shield"></i>
          <span>Admin Panel</span>
        </div>

        <nav className="admin-aptitude-menu">

          <button
            onClick={() =>
              navigate("/admin/dashboard")
            }
          >
            <i className="fa-solid fa-chart-line"></i>
            Dashboard
          </button>

          <button
            onClick={() =>
              navigate("/admin/users")
            }
          >
            <i className="fa-solid fa-users"></i>
            Users
          </button>

          <button className="active">
            <i className="fa-solid fa-brain"></i>
            Aptitude Questions
          </button>

          <button>
            <i className="fa-solid fa-code"></i>
            Coding Questions
          </button>

          <button>
            <i className="fa-solid fa-file-lines"></i>
            Tests
          </button>

          <button>
            <i className="fa-solid fa-bell"></i>
            Reminders
          </button>

        </nav>

        <button
          className="admin-aptitude-logout"
          onClick={handleLogout}
        >
          <i className="fa-solid fa-right-from-bracket"></i>
          Logout
        </button>

      </aside>

      {/* MAIN CONTENT */}
      <main className="admin-aptitude-main">

        <div className="admin-aptitude-header">

          <div>
            <h1>Aptitude Questions</h1>

            <p>
              View and manage aptitude questions
              available in the portal.
            </p>
          </div>

          <button
  className="add-aptitude-btn"
  onClick={() => setShowForm(true)}
>
            <i className="fa-solid fa-plus"></i>
            Add Question
          </button>

        </div>

        {/* SUMMARY */}
        <div className="aptitude-summary-card">

          <div className="aptitude-summary-icon">
            <i className="fa-solid fa-brain"></i>
          </div>

          <div>
            <h2>{questions.length}</h2>
            <p>Total Questions</p>
          </div>

        </div>
        {showForm && (
  <div className="aptitude-form-card">

    <div className="aptitude-form-header">
     <h2>
  {editingQuestion
    ? "Edit Aptitude Question"
    : "Add Aptitude Question"}
</h2>

      <button
        type="button"
        className="close-form-btn"
        onClick={() => {
  setShowForm(false);
  setEditingQuestion(null);
}}
      >
        <i className="fa-solid fa-xmark"></i>
      </button>
    </div>

   <form onSubmit={handleSaveQuestion}>

      <div className="aptitude-form-row">

        <div className="aptitude-form-group">
          <label>Category</label>

          <select
            name="category"
            value={formData.category}
            onChange={handleFormChange}
          >
            <option value="quantitative">
              Quantitative
            </option>

            <option value="logical">
              Logical
            </option>

            <option value="verbal">
              Verbal
            </option>
          </select>
        </div>

        <div className="aptitude-form-group">
          <label>Difficulty</label>

          <select
            name="difficulty"
            value={formData.difficulty}
            onChange={handleFormChange}
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

      </div>

      <div className="aptitude-form-group">
        <label>Question</label>

        <textarea
          name="question"
          placeholder="Enter the question"
          value={formData.question}
          onChange={handleFormChange}
          required
        />
      </div>

      <div className="aptitude-options-grid">

        {formData.options.map((option, index) => (
          <div
            className="aptitude-form-group"
            key={index}
          >
            <label>
              Option {index + 1}
            </label>

            <input
              type="text"
              placeholder={`Enter option ${index + 1}`}
              value={option}
              onChange={(e) =>
                handleOptionChange(
                  index,
                  e.target.value
                )
              }
              required
            />
          </div>
        ))}

      </div>

      <div className="aptitude-form-group">
        <label>Correct Answer</label>

        <select
          name="answer"
          value={formData.answer}
          onChange={handleFormChange}
        >
          <option value="0">Option 1</option>
          <option value="1">Option 2</option>
          <option value="2">Option 3</option>
          <option value="3">Option 4</option>
        </select>
      </div>

      <div className="aptitude-form-group">
        <label>Explanation</label>

        <textarea
          name="explanation"
          placeholder="Enter explanation"
          value={formData.explanation}
          onChange={handleFormChange}
        />
      </div>

      <div className="aptitude-form-buttons">

        <button
          type="button"
          className="cancel-aptitude-btn"
          onClick={() => {
  setShowForm(false);
  setEditingQuestion(null);
}}
        >
          Cancel
        </button>

        <button
          type="submit"
          className="save-aptitude-btn"
        >
          <i className="fa-solid fa-check"></i>
         {editingQuestion
  ? "Update Question"
  : "Add Question"}
        </button>

      </div>

    </form>

  </div>
)}

        {error && (
          <div className="admin-aptitude-error">
            {error}
          </div>
        )}
        <div className="aptitude-filters">

  <div className="aptitude-search">
    <i className="fa-solid fa-magnifying-glass"></i>

    <input
      type="text"
      placeholder="Search questions..."
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

    <option value="quantitative">
      Quantitative
    </option>

    <option value="logical">
      Logical
    </option>

    <option value="verbal">
      Verbal
    </option>
  </select>

  <select
    value={difficultyFilter}
    onChange={(e) =>
      setDifficultyFilter(e.target.value)
    }
  >
    <option value="all">
      All Difficulties
    </option>

    <option value="easy">
      Easy
    </option>

    <option value="medium">
      Medium
    </option>

    <option value="hard">
      Hard
    </option>
  </select>

  <button
    className="clear-filters-btn"
    onClick={() => {
      setSearchText("");
      setCategoryFilter("all");
      setDifficultyFilter("all");
    }}
  >
    <i className="fa-solid fa-rotate-left"></i>
    Clear
  </button>

</div>

        {/* QUESTIONS */}
        {loading ? (

          <div className="admin-aptitude-loading">
            <i className="fa-solid fa-spinner fa-spin"></i>
            <p>Loading questions...</p>
          </div>

        ) : (
             
          <div className="admin-aptitude-table-container">

            {filteredQuestions.length === 0 ? (

              <div className="no-aptitude">
                <i className="fa-solid fa-brain"></i>

            <h3>
  No matching questions found
</h3>

<p>
  Try changing your search or filters.
</p>
              </div>

            ) : (

              <table className="admin-aptitude-table">

                <thead>
                  <tr>
                    <th>#</th>
                    <th>Question</th>
                    <th>Category</th>
                    <th>Difficulty</th>
                    <th>Answer</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>

                  {filteredQuestions.map(
                    (question, index) => (

                      <tr key={question._id}>

                        <td>
                          {index + 1}
                        </td>

                        <td className="question-cell">
                          {question.question}
                        </td>

                        <td>
                          {question.category}
                        </td>

                        <td>
                          <span
                            className={`difficulty-badge ${question.difficulty}`}
                          >
                            {question.difficulty}
                          </span>
                        </td>

                        <td>
                          Option{" "}
                          {question.answer + 1}
                        </td>

                        <td>
                          <button
  className="edit-aptitude-btn"
  onClick={() =>
    handleEditQuestion(question)
  }
>
  <i className="fa-solid fa-pen"></i>
</button>

                          <button
  className="delete-aptitude-btn"
  onClick={() =>
    handleDeleteQuestion(question._id)
  }
>
  <i className="fa-solid fa-trash"></i>
</button>
                        </td>

                      </tr>

                    )
                  )}

                </tbody>

              </table>

            )}

          </div>

        )}

      </main>

    </div>
  );
}

export default AdminAptitude;