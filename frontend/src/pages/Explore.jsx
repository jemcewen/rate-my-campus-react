import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../components/Spinner';
import CampusCard from '../components/CampusCard';
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
      <div className='grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2'>
        {campuses.map((campus) => (
          <CampusCard campus={campus} key={campus._id} />
        ))}
      </div>
    </div>
  );
};
export default Explore;
