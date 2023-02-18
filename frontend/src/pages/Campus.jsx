import { Link, useParams } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getCampus, reset } from '../features/campus/campusSlice';
import { FaStar, FaArrowLeft } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import Spinner from '../components/Spinner';
import ImageSlider from '../components/ImageSlider';
import ReviewForm from '../components/ReviewForm';
import ReviewList from '../components/ReviewList';
import CampusMap from '../components/CampusMap';

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

  const reviewsRef = useRef(null);

  const handleClick = () => {
    reviewsRef.current.scrollIntoView({
      behavior: 'smooth',
    });
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
            <div className='flex flex-wrap gap-8 sm:gap-0 '>
              <div className='w-full sm:mb-4 sm:w-3/4 sm:pr-8 order-2 sm:order-1  '>
                <div className='shadow-lg rounded-2xl overflow-hidden bg-white h-full'>
                  <div className='py-6 px-4 h-full flex flex-col gap-4 justify-evenly'>
                    <p className='text-lg text-gray-500 font-medium '>
                      {campus.location}
                    </p>

                    {campus.description && (
                      <p className='leading-loose'>{campus.description}</p>
                    )}
                    <button
                      className='font-medium text-blue-500 text-left'
                      onClick={handleClick}
                    >
                      Check out the reviews!
                    </button>
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
          <div className='flex flex-wrap gap-2 sm:gap-0'>
            <div className='w-full sm:w-1/2 sm:pr-4 '>
              {campus.images.length > 0 && (
                <ImageSlider images={campus.images} />
              )}
            </div>
            <div className='w-full sm:w-1/2 sm:pl-4 pt-8 sm:pt-0'>
              <CampusMap geometry={campus.geometry} />
            </div>
          </div>
          <div ref={reviewsRef}>
            <ReviewList campus={params.campusId} />
          </div>
          <div className='sm:w-1/2 sm:pr-4'>
            <ReviewForm />
          </div>
        </div>
      </div>
    );
  }
};
export default Campus;
