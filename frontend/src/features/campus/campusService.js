import axios from 'axios';

// Create new campus
const createCampus = async (campusData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post('/api/campuses', campusData, config);
  return response.data;
};

const campusService = {
  createCampus,
};

export default campusService;
