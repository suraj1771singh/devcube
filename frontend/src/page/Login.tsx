import React, { useState,Dispatch, useEffect } from 'react'
import {useNavigate} from "react-router-dom"
import { loginUser } from '../Redux/auth/auth.actions'
import {useDispatch, useSelector} from 'react-redux'
import { rootReducertype } from '../Redux/Store'
import Alert from '../Components/Alert'
import Loader from '../Components/Loader'
import { BiHide, BiShow } from 'react-icons/bi'
const Login = () => {
  const nav = useNavigate()
 const {isAuth,login_loading,login_error}  = useSelector((val:rootReducertype)=>val?.auth)
  let dispatch:Dispatch<any> = useDispatch()
  let {drk_theme} = useSelector((val:rootReducertype)=>val.theme)
  const [userData,setUserData] = useState({email:"",password:""})
  const handleChange=(e: { target: { name: string; value: string } })=>{
    setUserData({...userData,[e.target.name]:e.target.value})
  }
  const [showPass,setShowPass] = useState(false)
  const handleLogin = (e: { preventDefault: () => void })=>{
    e.preventDefault()
    dispatch(loginUser(userData))
  }
  useEffect(() => { 
    if(isAuth){
      nav("/")
    }
  }, [isAuth, nav])
  return (
    <>
    <div className='w-11/12 m-auto'>
      <div className='w-1/2 m-auto items-center flex flex-col p-4'>
        <h3 className='font-bold text-2xl'>
          Login
        </h3>
      <div className={`shadow-md rounded-md p-6 w-3/4 my-4 ${drk_theme?"bg-bg_dark_sec text-font_dark_pri":"bg-bg_light_sec text-font_light_pri"}`}>
        <form className='flex flex-col' onSubmit={handleLogin}>
        <label htmlFor="email" className='my-4 my-4 border-[1px] rounded-md border-gray-600 p-3'>Email:
        <input type="email" required value={userData.email} name='email' onChange={handleChange} placeholder='user@example' className='bg-transparent w-3/4 outline-none px-2' />
        </label>
        <label htmlFor="password" className='my-4 border-[1px] rounded-md border-gray-700 p-3 flex items-center'>Password
        <input type={`${showPass?"text":"password"}`} required value={userData.password} name="password" onChange={handleChange} placeholder='your password' className='bg-transparent w-2/3 outline-none px-2 mx-2' />{showPass?<span><BiShow onClick={()=>setShowPass(false)} className='text-2xl cursor-pointer'/></span>:<span><BiHide onClick={()=>setShowPass(true)} className='text-2xl cursor-pointer'/></span>}
      </label>

        {login_loading?<button disabled className='border-[1px] w-fit border-gray-600 py-2 px-4 cursor-pointer m-auto rounded-md' >Loading...</button>  :<input type="submit" value='Login' className='border-[1px] w-fit border-gray-600 py-2 px-4 cursor-pointer m-auto rounded-md'/>}
        <p className='text-sm text-gray-300 mt-4'>Are You a New User? <span className='text-blue-500 underline cursor-pointer' onClick={()=>nav('/signup')}>Register here</span> </p>
      </form>
      </div>
      </div>  
    </div>
   {login_error&&<Alert text='Invalid Cradentials' type='error'/>}
   {login_loading&&<Loader text="Loading..."/>}
    </> 
  )
}

export default Login