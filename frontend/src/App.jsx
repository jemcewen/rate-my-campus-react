import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Nav from './components/Nav';
import Campuses from './pages/Campuses';
import Register from './pages/Register';
import Login from './pages/Login';

const App = () => {
  return (
    <div>
      <Toaster />
      <Router>
        <Nav />
        <div className='min-h-[calc(100vh-80px)] pb-20 bg-gray-100 flex justify-center items-center '>
          <Routes>
            <Route path='/' element={<Campuses />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
};
export default App;
