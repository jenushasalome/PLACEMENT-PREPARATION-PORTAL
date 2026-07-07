import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProblems } from "../../services/codingService";
import "./CodingHome.css";

export default function CodingHome() {
  const navigate = useNavigate();

  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("All");

  useEffect(() => {
    loadProblems();
  }, []);

  const loadProblems = async () => {
    try {
      const res = await getProblems();
      setProblems(res.data);
    } catch (err) {
      console.log("Error loading problems:", err);
    } finally {
      setLoading(false);
    }
  };

  const filtered = problems.filter((problem) => {
    const searchMatch = problem.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const difficultyMatch =
      difficulty === "All" ||
      problem.difficulty === difficulty;

    return searchMatch && difficultyMatch;
  });

  return (
    <div className="coding-home">

      <div className="coding-header">

        <div>
          <h1>Coding Practice</h1>
          <p>
            Practice coding for placement interviews.
          </p>
        </div>

        <input
          type="text"
          placeholder="Search Problems..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="difficulty-filter">

  <button
    className={difficulty === "All" ? "active-filter" : ""}
    onClick={() => setDifficulty("All")}
  >
    All
  </button>

  <button
    className={difficulty === "Easy" ? "active-filter" : ""}
    onClick={() => setDifficulty("Easy")}
  >
    Easy
  </button>

  <button
    className={difficulty === "Medium" ? "active-filter" : ""}
    onClick={() => setDifficulty("Medium")}
  >
    Medium
  </button>

  <button
    className={difficulty === "Hard" ? "active-filter" : ""}
    onClick={() => setDifficulty("Hard")}
  >
    Hard
  </button>

</div>
      </div>

      <div className="coding-content">

        {/* Left Sidebar */}

       

        {/* Problem List */}

        <div className="problem-list full-width">

          {loading ? (

            <h2>Loading Problems...</h2>

          ) : filtered.length === 0 ? (

            <h2>No Problems Found</h2>

          ) : (

            filtered.map((problem) => (

              <div
                className="problem-card"
                key={problem._id}
              >

                <div>

                  <h2>{problem.title}</h2>

                  <p>

                    <span
                      className={problem.difficulty.toLowerCase()}
                    >
                      {problem.difficulty}
                    </span>

                    {" • "}

                    {problem.topic}

                    {" • "}

                    {problem.points} Points

                  </p>

                </div>

                <button
                  onClick={() =>
                    navigate(`/coding/problem/${problem._id}`)
                  }
                >
                  Solve Challenge
                </button>

              </div>

            ))

          )}

        </div>

      </div>

    </div>
  );
}