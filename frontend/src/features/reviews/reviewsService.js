import axios from 'axios';

// Get campus reviews
const getReviews = async (id) => {
  const response = await axios.get(`/api/campuses/${id}/reviews`);
  return response.data;
};

const reviewsService = {
  getReviews,
};

export default reviewsService;
