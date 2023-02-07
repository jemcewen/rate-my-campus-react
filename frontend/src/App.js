import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Nav from './components/Nav';
import Campuses from './pages/Campuses';
import Register from './pages/Register';
import Login from './pages/Login';

const App = () => {
  return (
    <>
      <Toaster />
      <Router>
        <Nav />
        <Routes>
          <Route path='/' element={<Campuses />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </Router>
    </>
  );
};
export default App;
