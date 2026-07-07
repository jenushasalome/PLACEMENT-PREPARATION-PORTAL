import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Editor from "@monaco-editor/react";

import {
  getProblem,
  runCode as runCodeService,
  submitCode as submitCodeService
} from "../../services/codingService";

import "./coding.css";
import { useNavigate } from "react-router-dom";

export default function CodingEditor() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [language, setLanguage] = useState("java");
  const [code, setCode] = useState("");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitResult, setSubmitResult] = useState(null);

  const [activeTab, setActiveTab] = useState("problem");
const [problem, setProblem] = useState(null);
  

  const templates = {
    java: `import java.util.*;

public class Main {

    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        int a = sc.nextInt();
        int b = sc.nextInt();

        System.out.println(a + b);

    }

}`,

    python: `a = int(input())
b = int(input())

print(a+b)`,

    cpp: `#include<iostream>
using namespace std;

int main(){

    int a,b;

    cin>>a>>b;

    cout<<a+b;

    return 0;

}`,

    c: `#include<stdio.h>

int main(){

    int a,b;

    scanf("%d%d",&a,&b);

    printf("%d",a+b);

    return 0;

}`,
  };

 useEffect(() => {

  if (problem) {

    if (
      problem.starterCode &&
      problem.starterCode[language]
    ) {

      setCode(problem.starterCode[language]);

    } else {

      setCode(templates[language]);

    }

  } else {

    setCode(templates[language]);

  }

  setSubmitResult(null);

}, [language, problem]);
  useEffect(() => {
  loadProblem();
}, [id]);
const loadProblem = async () => {

  try {

    const res = await getProblem(id);

    setProblem(res.data);

  }

  catch (err) {

    console.log(err);

  }

};

  

  const runCode = async () => {

    setLoading(true);

    setOutput("");

    try {

    const res = await runCodeService({

problemId: id,

language,

code,

input

});
     

      if (res.data.success) {
        setOutput(res.data.output);
      } else {
        setOutput(res.data.error);
      }

    } catch (err) {

      setOutput(
        err.response?.data?.error ||
        "Execution Failed"
      );

    }

    setLoading(false);

  };

  

  const submitCode = async () => {

   

    try {

   const user = JSON.parse(localStorage.getItem("user"));

const res = await submitCodeService({
    problemId: id,
    language,
    code,
    userId: user.id
});
      setSubmitResult(res.data);

   } catch (err) {

  console.log(err);

  console.log(err.response?.data);

  alert(err.response?.data?.error || err.response?.data?.message || "Submission Failed");

}

  };

  if (!problem) {

  return <h2>Loading Problem...</h2>;

}
    return (
    <div className="editor-page">

      {/* ===================== TOP BAR ===================== */}

      <div className="editor-topbar">

        <div className="top-left">

          <button
            className="editor-back-btn"
            onClick={() => navigate("/coding")}
          >
            ← Back
          </button>

          <div>

            <h2>{problem.title}</h2>

            <div className="badges">

              <span className="easy">
                {problem.difficulty}
              </span>

              <span>{problem.topic}</span>

              <span>{problem.points} Points</span>

            </div>

          </div>

        </div>

        <div className="top-right">

          <select
            className="language-select"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="java">Java</option>
            <option value="python">Python</option>
            <option value="cpp">C++</option>
            <option value="c">C</option>
          </select>

          <button
            className="run-btn"
            onClick={runCode}
            disabled={loading}
          >
            {loading ? "Running..." : "Run Code"}
          </button>

          <button
            className="submit-btn"
            onClick={submitCode}
          >
            Submit
          </button>

        </div>

      </div>

      {/* ===================== MAIN LAYOUT ===================== */}

      <div className="editor-layout">

        {/* ================= LEFT PANEL ================= */}

        <div className="problem-panel">

          <div className="tabs">

            <button
              className={
                activeTab === "problem"
                  ? "active"
                  : ""
              }
              onClick={() => setActiveTab("problem")}
            >
              Problem
            </button>

            <button
              className={
                activeTab === "submission"
                  ? "active"
                  : ""
              }
              onClick={() => setActiveTab("submission")}
            >
              Submission
            </button>

            

          </div>

          <div className="problem-content">

            {activeTab === "problem" && (

              <>

                <section>

                  <h3>Problem Statement</h3>

                  <p>{problem.description}</p>

                </section>

                <section>

                  <h3>Input Format</h3>

                  <pre>{problem.inputFormat}</pre>

                </section>

                <section>

                  <h3>Output Format</h3>

                  <pre>{problem.outputFormat}</pre>

                </section>

                <section>

                  <h3>Constraints</h3>

                  <pre>{problem.constraints}</pre>

                </section>

                <section>

                  <h3>Sample Input</h3>

                  <pre>{problem.sampleInput}</pre>

                </section>

                <section>

                  <h3>Sample Output</h3>

                  <pre>{problem.sampleOutput}</pre>

                </section>

                <section>

                  <h3>Explanation</h3>

                  <p>{problem.explanation}</p>

                </section>

              </>

            )}

            {activeTab === "submission" && (

              <div>

                <h3>Submission Result</h3>

                {submitResult ? (

                  <>
                    <h4>
                      Passed {submitResult.passed} /
                      {submitResult.total}
                    </h4>

                    {submitResult.results.map((test, index) => (

                      <div
                        key={index}
                        style={{
                          marginBottom: 20,
                          padding: 15,
                          border: "1px solid #ddd",
                          borderRadius: 8
                        }}
                      >

                        <strong>
                          Test Case {index + 1}
                        </strong>

                        <p>
                          {test.passed
                            ? "✅ Passed"
                            : "❌ Failed"}
                        </p>

                        <pre>{test.output}</pre>

                      </div>

                    ))}

                  </>

                ) : (

                  <p>No submissions yet.</p>

                )}

              </div>

            )}

            {activeTab === "discussion" && (

              <div>

                <h3>Discussion</h3>

                <p>
                  Discussion feature will be added
                  later.
                </p>

              </div>

            )}

          </div>

        </div>

        {/* ================= RIGHT PANEL ================= */}

        <div className="editor-panel">

          <Editor
            height="calc(100vh - 295px)"
            theme="vs-dark"
            language={language}
            value={code}
            onChange={(value) =>
              setCode(value || "")
            }
          />

          <div className="console">

            <div className="console-box">

              <h4>Custom Input</h4>

              <textarea
                value={input}
                onChange={(e) =>
                  setInput(e.target.value)
                }
                placeholder="Enter input..."
              />

            </div>

            <div className="console-box">

              <h4>Output</h4>

              <pre>{output}</pre>

            </div>

          </div>

        </div>

      </div>

    </div>
  );

}
