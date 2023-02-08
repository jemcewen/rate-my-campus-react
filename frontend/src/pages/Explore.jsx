import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../components/Spinner';
import { getCampuses, reset } from '../features/campus/campusSlice';

const Explore = () => {
  const dispatch = useDispatch();

  const { campuses, isLoading, isError, message } = useSelector(
    (state) => state.campuses
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    dispatch(getCampuses());

    // Is this necessary? >>>
    return () => {
      dispatch(reset());
    };
  }, [isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div className='container'>
      <h1 className='text-3xl font-semibold'>Explore</h1>
      {campuses.map((campus) => (
        <p>{campus.name}</p>
      ))}
    </div>
  );
};
export default Explore;
