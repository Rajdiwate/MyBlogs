import { useDispatch } from 'react-redux'
import React, { useEffect, useState } from 'react'
import authService from './appwrite/auth'
import { login , logout } from './store/authSlice'
import { Outlet } from 'react-router-dom'
import { Footer, Header, Loading as Loader } from './components/index'


const App = () => {

  const [Loading, setLoading] = useState(true)
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
          if(!userData){
            dispatch(logout());
            
          } else{
            dispatch(login({userData}))
          }
      })
      .finally(()=>setLoading(false))
  }, [])

  
  if(Loading){
    return <Loader/>
  }

  return (
      <div className='min-h-screen flex flex-wrap content-between bg-gray-700'> 
      <div className='w-full block'>
        <Header/>
        <main>
          <Outlet/>
        </main>
        <Footer/>
      </div>
      </div>
  );
}

export default App
