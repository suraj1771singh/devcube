import { Routes, Route } from 'react-router-dom'
import Home from '../page/Home'
import Login from '../page/Login'
import Navbar from '../Components/Navbar'
import Signup from '../page/Signup'
import PrivateRoutes from './PrivateRoutes'
import Profile from '../page/Profile'
import Room from '../page/Room'
import CreateRoom from '../page/CreateRoom'
import UpdateRoom from '../page/UpdateRoom'
const AllRoutes = () => {
  return (
    <div className='' >
        <Navbar/>
        <div className='pt-28'>
        <Routes>
        <Route path='/' element={<PrivateRoutes><Home/></PrivateRoutes>}/>
        <Route path='/profile/:id' element={<PrivateRoutes><Profile/></PrivateRoutes>}/>
        <Route path='/room/:id' element={<PrivateRoutes><Room/></PrivateRoutes>}/>
        <Route path='/create_room/' element={<PrivateRoutes><CreateRoom/></PrivateRoutes>}/>
        <Route path='/update_room/:id' element={<PrivateRoutes><UpdateRoom/></PrivateRoutes>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        </Routes>
        </div>
    </div>
  )
}

export default AllRoutes