import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaSignInAlt } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { login, reset } from '../features/auth/authSlice';
import Spinner from '../components/Spinner';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    // Redirect when logged in
    if (isSuccess && user) {
      toast.success(`Welcome back ${user.name}`);
      navigate('/');
    }

    dispatch(reset());
  }, [isError, isSuccess, user, message, navigate, dispatch]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(login(formData));
  };

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div className='container max-w-sm'>
      <div className='bg-white shadow-md rounded p-8 flex flex-col gap-8'>
        <h1 className='text-3xl font-semibold text-center'>Login</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
          <div className='flex flex-col gap-2'>
            <label htmlFor='email' className='text-gray-700 text-sm font-bold'>
              Email
            </label>
            <input
              type='email'
              name='email'
              id='email'
              placeholder='Please enter your email'
              value={email}
              onChange={handleChange}
              className='shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none'
            />
          </div>
          <div className='flex flex-col gap-2'>
            <label
              htmlFor='password'
              className='text-gray-700 text-sm font-bold'
            >
              Password
            </label>
            <input
              type='password'
              name='password'
              id='password'
              placeholder='Please enter your password'
              value={password}
              onChange={handleChange}
              className='shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none'
            />
          </div>
          <div className='flex justify-center'>
            <button
              type='submit'
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;
