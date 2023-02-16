import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getCampus, reset } from '../features/campus/campusSlice';
import { FaStar, FaArrowLeft } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import Spinner from '../components/Spinner';
import ImageSlider from '../components/ImageSlider';
import ReviewForm from '../components/ReviewForm';
import ReviewList from '../components/ReviewList';

const Campus = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { campus, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.campus
  );

  const { reviews } = useSelector((state) => state.reviews);

  const averageRating = () => {
    const sum = reviews.reduce((total, next) => total + next.rating, 0);
    const average = sum / reviews.length;
    // Round the average to one decimal place
    return Math.round(average * 10) / 10;
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
      navigate('/');
    }
  }, [isError]);

  useEffect(() => {
    dispatch(getCampus(params.campusId));

    return () => {
      dispatch(reset());
    };
  }, []);

  if (isLoading) {
    return <Spinner />;
  }
  if (isSuccess) {
    return (
      <div className='container'>
        <div className='flex flex-col gap-8'>
          <div className='flex flex-col gap-2 sm:gap-5'>
            <div className='hidden sm:block pt-5 text-gray-300 uppercase tracking-wide '>
              <Link to='/' className='flex gap-1 items-center w-fit'>
                <FaArrowLeft /> Back to all campuses
              </Link>
            </div>
            <h1 className='my-2 sm:mt-8 sm:mb-6 text-4xl md:text-6xl xl:text-7xl font-medium leading-tight'>
              {campus.name}
            </h1>
            <div className='flex flex-wrap'>
              <div className='w-full mb-4 sm:w-3/4 sm:pr-8 order-2 sm:order-1 hidden sm:inline-block'>
                <div className='shadow-lg rounded-2xl overflow-hidden bg-white h-full'>
                  <div className='py-6 px-4 h-full flex flex-col gap-4 justify-evenly'>
                    <p className='text-lg text-gray-500 font-medium '>
                      {campus.location}
                    </p>

                    {campus.description && (
                      <p className='leading-loose'>{campus.description}</p>
                    )}

                    <p className='font-medium text-blue-500'>
                      Link to something here
                    </p>
                  </div>
                </div>
              </div>

              <div className='w-full sm:mb-4 sm:w-1/4 order-1'>
                <div className='p-10 h-full shadow-lg bg-white rounded-2xl'>
                  <div className='flex flex-col gap-2 items-center'>
                    <p className='font-heading font-medium'>
                      <span className='text-6xl sm:text-8xl'>
                        {reviews.length > 0 ? averageRating() : 0}
                      </span>
                      <span className='text-gray-300 text-lg'>/5</span>
                    </p>
                    <div className='flex'>
                      {reviews.length > 0
                        ? [...Array(5)].map((_, index) => {
                            const ratingValue = index + 1;
                            return (
                              <FaStar
                                key={index}
                                color={
                                  ratingValue <= averageRating()
                                    ? '#ffc107'
                                    : '#e4e5e9'
                                }
                              />
                            );
                          })
                        : [...Array(5)].map((_, index) => {
                            return <FaStar key={index} color={'#e4e5e9'} />;
                          })}
                    </div>
                    <p className='text-sm text-gray-300 font-medium'>
                      {reviews.length}{' '}
                      {reviews.length === 1 ? 'review' : 'reviews'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ImageSlider images={campus.images} />
          <ReviewList campus={params.campusId} />
          <ReviewForm />
        </div>
      </div>
    );
  }
};
export default Campus;
