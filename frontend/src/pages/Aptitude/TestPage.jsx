import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { getQuestions } from "../../services/aptitudeService";

export default function TestPage() {
  const { category } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(30 * 60);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    loadQuestions();
  }, [category]);

  const loadQuestions = async () => {
    try {
      setLoading(true);
      const res = await getQuestions(category);
      setQuestions(res.data);
    } catch (error) {
      console.error(error);
      alert("Failed to load questions.");
    } finally {
      setLoading(false);
    }
  };

  
  useEffect(() => {
    if (questions.length === 0) return;

    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, questions]);

  const handleAnswer = (optionIndex) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion]: optionIndex,
    }));
  };

  
  const handleSubmit = async () => {
    let score = 0;

    questions.forEach((q, index) => {
      if (selectedAnswers[index] === q.answer) {
        score++;
      }
    });

    try {
     
      await axios.post("http://localhost:5000/api/dashboard/save-result", {
        userId: user.id,
        score,
      });

      
      navigate("/aptitude/result", {
        state: {
          score,
          total: questions.length,
        },
      });
    } catch (error) {
      console.error("Error saving result:", error);
      alert("Failed to save result");
    }
  };

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <h3>Loading Questions...</h3>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="container mt-5 text-center">
        <h3>No Questions Found</h3>
      </div>
    );
  }

  const question = questions[currentQuestion];

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="container-fluid mt-4">

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>{category.toUpperCase()} TEST</h2>

        <h4 className="text-danger">
          ⏰ {minutes}:{seconds.toString().padStart(2, "0")}
        </h4>
      </div>

      <div className="row">

        {/* Navigator */}
        <div className="col-md-3">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              Question Navigator
            </div>

            <div className="card-body">
              {questions.map((_, index) => (
                <button
                  key={index}
                  className={`btn m-1 ${
                    currentQuestion === index
                      ? "btn-warning"
                      : selectedAnswers[index] !== undefined
                      ? "btn-success"
                      : "btn-secondary"
                  }`}
                  onClick={() => setCurrentQuestion(index)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Question */}
        <div className="col-md-9">
          <div className="card shadow">
            <div className="card-body">

              <h5>
                Question {currentQuestion + 1} of {questions.length}
              </h5>

              <hr />

              <h4>{question.question}</h4>

              <div className="mt-4">

                {question.options.map((option, index) => (
                  <div className="form-check mb-3" key={index}>
                    <input
                      className="form-check-input"
                      type="radio"
                      name="answer"
                      checked={selectedAnswers[currentQuestion] === index}
                      onChange={() => handleAnswer(index)}
                    />

                    <label className="form-check-label">
                      {option}
                    </label>
                  </div>
                ))}

              </div>

              <hr />

              <div className="d-flex justify-content-between">

                <button
                  className="btn btn-secondary"
                  disabled={currentQuestion === 0}
                  onClick={() =>
                    setCurrentQuestion(currentQuestion - 1)
                  }
                >
                  Previous
                </button>

                {currentQuestion < questions.length - 1 ? (
                  <button
                    className="btn btn-primary"
                    onClick={() =>
                      setCurrentQuestion(currentQuestion + 1)
                    }
                  >
                    Save & Next
                  </button>
                ) : (
                  <button
                    className="btn btn-success"
                    onClick={handleSubmit}
                  >
                    Submit Test
                  </button>
                )}

              </div>

            </div>
          </div>
        </div>

      </div>

    </div>
  );
}