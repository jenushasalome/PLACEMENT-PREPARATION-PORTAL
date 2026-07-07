import axios from "axios";

const API = "http://localhost:5000/api";

export const addTest = async (data) => {
  const res = await axios.post(`${API}/tests`, data);
  return res.data;
};
export const updateTest = async (id, data) => {
  const res = await axios.put(`${API}/tests/${id}`, data);
  return res.data;
};

export const addInterview = async (data) => {
  const res = await axios.post(
    `${API}/interviews`,
    data
  );
  return res.data;
};
export const updateInterview = async (id, data) => {
  const res = await axios.put(
    `${API}/interviews/${id}`,
    data
  );

  return res.data;
};
export const getTests = async () => {
  const res = await axios.get(`${API}/tests`);
  return res.data;
};

export const getInterviews = async () => {
  const res = await axios.get(
    `${API}/interviews`
  );
  return res.data;
};

export const deleteTest = async (id) => {
  await axios.delete(`${API}/tests/${id}`);
};

export const deleteInterview = async (id) => {
  await axios.delete(
    `${API}/interviews/${id}`
  );
};