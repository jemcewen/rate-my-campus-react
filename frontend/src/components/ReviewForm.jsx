import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createReview, reset } from '../features/review/reviewSlice';
import toast from 'react-hot-toast';
import StarRating from './StarRating';

const ReviewForm = () => {
  const [rating, setRating] = useState(0);
  const [body, setBody] = useState('');

  const dispatch = useDispatch();
  const { isError, isSuccess, message } = useSelector((state) => state.review);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      toast.success(`Review added!`);
    }

    dispatch(reset());
  }, [isError, isSuccess]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user) {
      toast.error('Please login to review a campus');
    } else {
      const reviewData = { rating, body };
      dispatch(createReview(reviewData));
    }

    setRating(0);
    setBody('');
  };

  return (
    <div className='max-w-md'>
      <div className='flex flex-col gap-8'>
        <h2 className='text-3xl font-semibold'>Leave a Review</h2>
        <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
          <div className='flex flex-col gap-2'>
            <label htmlFor='rating' className='text-gray-700 text-sm font-bold'>
              Rating
            </label>
            <StarRating
              numStars={5}
              rating={rating}
              setRating={setRating}
              id='rating'
            />
          </div>
          <div className='flex flex-col gap-2'>
            <label htmlFor='review' className='text-gray-700 text-sm font-bold'>
              Review
            </label>
            <textarea
              name='review'
              id='review'
              placeholder='Please enter your review'
              rows='4'
              cols='1'
              wrap='hard'
              className='shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none resize-none'
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
          </div>
          <div className='flex justify-end'>
            <button
              type='submit'
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default ReviewForm;
