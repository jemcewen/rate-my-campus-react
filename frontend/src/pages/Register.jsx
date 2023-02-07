import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FaUser } from 'react-icons/fa';
import { register, reset } from '../features/auth/authSlice';
import Spinner from '../components/Spinner';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const { name, email, password } = formData;

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

    dispatch(register(formData));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section>
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please create an account</p>
      </section>
      <section>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor='name'>Name</label>
            <input
              type='text'
              name='name'
              id='name'
              placeholder='What should we call you?'
              value={name}
              onChange={handleChange}
            />
          </div>
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
export default Register;
