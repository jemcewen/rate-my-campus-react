import axios from 'axios';

// Get campus reviews
const getReviews = async (id) => {
  const response = await axios.get(`/api/campuses/${id}/reviews`);
  return response.data;
};

// Create new review
const createReview = async (reviewData, campus, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    `/api/campuses/${campus}/reviews`,
    reviewData,
    config
  );
  return response.data;
};

const reviewsService = {
  getReviews,
  createReview,
};

export default reviewsService;
