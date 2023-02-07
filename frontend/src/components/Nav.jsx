import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';

const Nav = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleClick = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  };

  return (
    <nav>
      <div>
        <div>
          <Link to='/'>Rate My Campus</Link>
        </div>
        <div>
          {user ? (
            <button onClick={handleClick}>
              <FaSignOutAlt />
            </button>
          ) : (
            <>
              <Link to='/login'>
                <FaSignInAlt /> Login
              </Link>
              <Link to='/register'>
                <FaUser /> Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
export default Nav;
