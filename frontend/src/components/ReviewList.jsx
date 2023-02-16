import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getReviews, reset } from '../features/reviews/reviewsSlice';
import Spinner from './Spinner';
import Review from './Review';

const ReviewList = ({ campus }) => {
  const dispatch = useDispatch();

  const { reviews, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.reviews
  );

  useEffect(() => {
    dispatch(getReviews(campus));

    return () => {
      dispatch(reset());
    };
  }, []);

  if (isLoading) {
    return <Spinner />;
  }
  if (isSuccess) {
    return (
      <div>
        <div className='flex flex-col gap-8'>
          <h2 className='text-2xl font-semibold underline'>
            {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
          </h2>
          {reviews.map((review) => (
            <Review key={review._id} review={review} />
          ))}
        </div>
      </div>
    );
  }
};
export default ReviewList;
