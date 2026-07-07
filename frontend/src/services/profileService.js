import axios from "axios";

const API = "http://localhost:5000/api/profile";

// Get Profile
export const getProfile = (userId) => {
  return axios.get(`${API}/${userId}`);
};

// Update Profile
export const updateProfile = (userId, data) => {
  return axios.put(`${API}/${userId}`, data);
};
// Upload Profile Image
export const uploadImage = (file) => {

  const formData = new FormData();

  formData.append("image", file);

  return axios.post(
    "http://localhost:5000/api/upload",
    formData
  );

};