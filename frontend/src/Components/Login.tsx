import React, { useState,Dispatch, useEffect } from 'react'
import {useNavigate} from "react-router-dom"
import { loginUser } from '../Redux/auth/auth.actions'
import {useDispatch, useSelector} from 'react-redux'
import { rootReducertype } from '../Redux/Store'
const Login = () => {
  const nav = useNavigate()
 const {isAuth}  = useSelector((val:rootReducertype)=>val?.auth)
  let dispatch:Dispatch<any> = useDispatch()
  const [userData,setUserData] = useState({email:"",password:""})
  const handleChange=(e: { target: { name: any; value: any } })=>{
    setUserData({...userData,[e.target.name]:e.target.value})
  }
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
    <div className='w-11/12 m-auto'>
      <div className='w-1/2 m-auto items-center flex flex-col p-4'>
        <h3 className='font-bold text-2xl'>
          Login
        </h3>
      <div className='border-2 border-gray-500 rounded-md p-6 w-3/4 my-4'>
      <form className='flex flex-col' onSubmit={handleLogin}>
        <label htmlFor="email" className='my-4 my-4 border-[1px] rounded-md border-gray-600 p-3'>Email:
        <input type="email" value={userData.email} name='email' onChange={handleChange} placeholder='user@example' className='bg-transparent w-3/4 outline-none px-2' />
        </label>
        <label htmlFor="password" className='my-4 border-[1px] rounded-md border-gray-600 p-3'>Password:
        <input type="password" value={userData.password} name="password" onChange={handleChange} placeholder='your password' className='bg-transparent w-2/3 outline-none px-2 mx-2' />
        </label>
        <input type="submit" value='Login' className='border-[1px] w-fit border-gray-600 py-2 px-4 cursor-pointer m-auto rounded-md'/>
        <p className='text-sm text-gray-300 mt-4'>Are You a New User? <span className='text-blue-500 underline cursor-pointer' onClick={()=>nav('/signup')}>Registor here</span> </p>
      </form>
      </div>
      </div>  
    </div>
  )
}

export default Login