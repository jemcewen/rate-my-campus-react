import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FaSignInAlt } from 'react-icons/fa';
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
      // toast.success(`Welcome back ${user.name}`);
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
    <>
      <section>
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Please login</p>
      </section>
      <section>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              name='email'
              id='email'
              placeholder='Please enter your email'
              value={email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              name='password'
              id='password'
              placeholder='Please enter your password'
              value={password}
              onChange={handleChange}
            />
          </div>
          <div>
            <button type='submit'>Submit</button>
          </div>
        </form>
      </section>
    </>
  );
};
export default Login;
