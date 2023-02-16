import axios from 'axios';

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

const reviewService = {
  createReview,
};

export default reviewService;
