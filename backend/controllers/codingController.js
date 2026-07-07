import CodingProblem from "../models/CodingProblem.js";
import User from "../models/User.js";
import fs from "fs";
import path from "path";
import os from "os";

import { exec } from "child_process";
import { promisify } from "util";
import { v4 as uuid } from "uuid";

const execute = promisify(exec);

const TEMP_DIR = path.join(os.tmpdir(), "placement_portal");

if (!fs.existsSync(TEMP_DIR)) {
    fs.mkdirSync(TEMP_DIR, { recursive: true });
}
const createWorkspace = () => {

    const folder = path.join(TEMP_DIR, uuid());

    fs.mkdirSync(folder);

    return folder;

};

const deleteWorkspace = (folder) => {

    if (fs.existsSync(folder)) {

        fs.rmSync(folder, {
            recursive: true,
            force: true
        });

    }

};
const runJava = async (folder, code, input) => {

    const javaFile = path.join(folder, "Main.java");

    const inputFile = path.join(folder, "input.txt");

    fs.writeFileSync(javaFile, code);

    fs.writeFileSync(inputFile, input);

    await execute(`javac Main.java`, {
        cwd: folder
    });

    const { stdout, stderr } = await execute(

        `java Main < input.txt`,
        {
            cwd: folder
        }

    );

    return stderr || stdout;

};
const runPython = async (folder, code, input) => {

    const pyFile = path.join(folder, "main.py");

    const inputFile = path.join(folder, "input.txt");

    fs.writeFileSync(pyFile, code);

    fs.writeFileSync(inputFile, input);

    const { stdout, stderr } = await execute(

        `python main.py < input.txt`,
        {
            cwd: folder
        }

    );

    return stderr || stdout;

};
const runC = async (folder, code, input) => {

    const cFile = path.join(folder, "main.c");

    const inputFile = path.join(folder, "input.txt");

    fs.writeFileSync(cFile, code);

    fs.writeFileSync(inputFile, input);

    await execute(

        `gcc main.c -o main`,
        {
            cwd: folder
        }

    );

    const { stdout, stderr } = await execute(

        `main.exe < input.txt`,
        {
            cwd: folder
        }

    );

    return stderr || stdout;

};
const runCpp = async (folder, code, input) => {

    const cppFile = path.join(folder, "main.cpp");

    const inputFile = path.join(folder, "input.txt");

    fs.writeFileSync(cppFile, code);

    fs.writeFileSync(inputFile, input);

    await execute(

        `g++ main.cpp -o main`,
        {
            cwd: folder
        }

    );

    const { stdout, stderr } = await execute(

        `main.exe < input.txt`,
        {
            cwd: folder
        }

    );

    return stderr || stdout;

};



export const getProblems = async (req, res) => {
  try {
    const problems = await CodingProblem.find(
      {},
      {
        title: 1,
        difficulty: 1,
        topic: 1,
      }
    );

    res.json(problems);

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};



export const getProblem = async (req, res) => {
  try {

    const problem = await CodingProblem.findById(req.params.id);

    if (!problem) {
      return res.status(404).json({
        message: "Problem not found",
      });
    }

    res.json(problem);

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }
};



export const runCode = async (req, res) => {

    const {
    problemId,
    language,
    code,
    input
} = req.body;
    const problem = await CodingProblem.findById(problemId);

if (!problem) {
    return res.status(404).json({
        error: "Problem not found"
    });
}



    const folder = createWorkspace();

    try {

        let output = "";

        switch (language) {

            case "java":

                output = await runJava(folder, code, input);

                break;

            case "python":

                output = await runPython(folder, code, input);

                break;

            case "c":

                output = await runC(folder, code, input);

                break;

            case "cpp":

                output = await runCpp(folder, code, input);

                break;

            default:

                deleteWorkspace(folder);

                return res.status(400).json({
                    error: "Unsupported Language"
                });

        }

        deleteWorkspace(folder);

        res.json({

            success: true,

            output: output.trim()

        });

    }

    catch (err) {

        deleteWorkspace(folder);

        res.status(500).json({

            success: false,

            error: err.stderr || err.message

        });

    }

};



export const submitCode = async (req, res) => {

    const {
    problemId,
    language,
    code,
    userId
} = req.body;

const problem = await CodingProblem.findById(problemId);

if (!problem) {
    return res.status(404).json({
        error: "Problem not found"
    });
}

const testCases = problem.hiddenTestCases;

    let passed = 0;

    const results = [];

    for (const test of testCases) {

        const folder = createWorkspace();

        try {

            let output = "";

            switch (language) {

                case "java":

                    output = await runJava(
                        folder,
                        code,
                        test.input
                    );

                    break;

                case "python":

                    output = await runPython(
                        folder,
                        code,
                        test.input
                    );

                    break;

                case "c":

                    output = await runC(
                        folder,
                        code,
                        test.input
                    );

                    break;

                case "cpp":

                    output = await runCpp(
                        folder,
                        code,
                        test.input
                    );

                    break;

                default:

                    deleteWorkspace(folder);

                    return res.status(400).json({
                        error: "Unsupported Language"
                    });

            }

            output = output.trim();

            const expected = test.output.trim();

            const isPassed = output === expected;

            if (isPassed) passed++;

            results.push({

                input: test.input,

                expected,

                output,

                passed: isPassed

            });

        }

        catch (err) {

            results.push({

                input: test.input,

                expected: test.output,

                output: err.stderr || err.message,

                passed: false

            });

        }

        finally {

            deleteWorkspace(folder);

        }

    }

  if (passed === testCases.length) {

    const { userId } = req.body;

    if (userId) {

        await User.findByIdAndUpdate(
            userId,
            {
                $inc: {
                    codingSolved: 1
                }
            }
        );

    }

}

res.json({
    total: testCases.length,
    passed,
    results
});

};

