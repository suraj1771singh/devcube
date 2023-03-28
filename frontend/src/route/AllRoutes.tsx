import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../page/Home'
import Login from '../page/Login'
import Navbar from '../Components/Navbar'
import Signup from '../page/Signup'
import PrivateRoutes from './PrivateRoutes'
import Profile from '../page/Profile'
const AllRoutes = () => {
  return (
    <div>
        <Navbar/>
        <div className='pt-20'>
        <Routes>
        <Route path='/' element={<PrivateRoutes><Home/></PrivateRoutes>}/>
        <Route path='/profile' element={<PrivateRoutes><Profile/></PrivateRoutes>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        </Routes>
        </div>
    </div>
  )
}

export default AllRoutes