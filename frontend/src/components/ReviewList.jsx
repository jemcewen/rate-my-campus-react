import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getReviews, reset } from '../features/reviews/reviewsSlice';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import toast from 'react-hot-toast';
import Spinner from './Spinner';
import Review from './Review';

const ReviewList = ({ campus }) => {
  const dispatch = useDispatch();

  const [list] = useAutoAnimate();

  const { reviews, isError, isSuccess, message } = useSelector(
    (state) => state.reviews
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(getReviews(campus));

    return () => {
      dispatch(reset());
    };
  }, [isError, message, dispatch, campus]);

  if (isSuccess) {
    return (
      <div className='flex flex-col gap-8'>
        <h2 className='text-2xl font-semibold underline'>
          {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
        </h2>
        <div className='flex flex-col gap-8' ref={list}>
          {reviews.map((review) => (
            <Review key={review._id} review={review} />
          ))}
        </div>
      </div>
    );
  }
};
export default ReviewList;
