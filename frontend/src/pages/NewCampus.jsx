import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import CampusForm from '../components/CampusForm';

const NewCampus = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, []);

  return (
    <div className='container max-w-sm'>
      <div className='flex flex-col gap-8'>
        <h1 className='text-3xl font-semibold'>Add Campus</h1>
        <CampusForm />
      </div>
    </div>
  );
};
export default NewCampus;
