import { Outlet, useNavigate } from 'react-router-dom';
import './App.css';
import { Navbar } from './components/navbar';
import { useEffect } from 'react';
import { fetchUserData } from './store/slice/userSlice';
import { fetchPostData } from './store/slice/postSlice';
import { useDispatch } from 'react-redux';

function App() {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {
    navigate("/posts")
    dispatch(fetchPostData())
    dispatch(fetchUserData())
  }, [])

  return (
    <div className="App">
      <div className='container'>
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
}

export default App;
