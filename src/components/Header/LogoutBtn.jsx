import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../store/authSlice';
import authService from '../../appwrite/auth'
import { useNavigate } from 'react-router-dom';

const LogoutBtn = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleOnClick = ()=>{
    authService.logout()
    .then(()=>{
      dispatch(logout());
      navigate('/login')
    })
    
    
  }
  return (
    <button onClick={handleOnClick} className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full text-white hover:text-black'>
      Logout
    </button>
  )
}

export default LogoutBtn