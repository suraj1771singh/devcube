import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './Home'
import Login from './Login'
import Navbar from './Navbar'
import Signup from './Signup'
const AllRoutes = () => {
  return (
    <div>
        <Navbar/>
        <div className='pt-20'>
        <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        </Routes>
        </div>
    </div>
  )
}

export default AllRoutes