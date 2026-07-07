import axios from "axios";

const API = "http://localhost:5000/api/aptitude";

export const getQuestions = async (category) => {
    return await axios.get(`${API}/${category}`);
};