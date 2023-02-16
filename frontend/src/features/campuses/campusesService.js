import axios from 'axios';

// Get campuses
const getCampuses = async () => {
  const response = await axios.get('/api/campuses');
  return response.data;
};

// Create new campus
const createCampus = async (campusData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  };
  const response = await axios.post('/api/campuses', campusData, config);
  return response.data;
};

const campusesService = {
  getCampuses,
  createCampus,
};

export default campusesService;
