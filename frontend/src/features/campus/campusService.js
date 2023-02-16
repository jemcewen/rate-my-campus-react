import axios from 'axios';

// Get single campus
const getCampus = async (id) => {
  const response = await axios.get(`/api/campuses/${id}`);
  return response.data;
};

const campusService = {
  getCampus,
};

export default campusService;
