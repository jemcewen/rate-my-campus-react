import axios from 'axios';

const API_ENDPOINT = import.meta.env.VITE_API_URL;

// Get single campus
const getCampus = async (id) => {
  const response = await axios.get(`${API_ENDPOINT}/api/campuses/${id}`);
  return response.data;
};

const campusService = {
  getCampus,
};

export default campusService;
