import axios from "axios";

const API = "http://localhost:5000/api/coding";

// Get all coding problems
export const getProblems = () => {
  return axios.get(API);
};

// Get single problem
export const getProblem = (id) => {
  return axios.get(`${API}/${id}`);
};

// Run code
export const runCode = (data) => {
  return axios.post(`${API}/run`, data);
};

// Submit code
export const submitCode = (data) => {
  return axios.post(`${API}/submit`, data);
};