import React, { useState,Dispatch, useEffect } from 'react'
import {useNavigate} from "react-router-dom"
import {useDispatch,useSelector} from 'react-redux'
import { registerUser } from '../Redux/auth/auth.actions'
import { rootReducertype } from '../Redux/Store'
const Signup = () => {
  const nav = useNavigate()
  const {isAuth}  = useSelector((val:rootReducertype)=>val?.auth)
  const dispatch:Dispatch<any> = useDispatch()
  const [newUserData,setNewUserData]= useState({first_name:"",email:"",password1:"",password2:""})
  useEffect(() => {
    if(isAuth){
      nav("/")
    }
  }, [isAuth, nav])
  const handleChange = (e: { target: { name: any; value: any } })=>{
    setNewUserData({...newUserData,[e.target.name]:e.target.value})
  }
  const handlesignup = (e: { preventDefault: () => void })=>{
    e.preventDefault()
    if(newUserData.password1===newUserData.password2){
      dispatch(registerUser(newUserData))
    }
  } 
  return (
    <div className='w-11/12 m-auto'>
    <div className='w-1/2 m-auto items-center flex flex-col pt-4'>
      <h3 className='font-bold text-2xl'>
        Register
      </h3>
    <div className='border-2 border-gray-500 rounded-md p-6 w-3/4 mt-4'>
    <form className='flex flex-col' onSubmit={handlesignup} >

      <label htmlFor="name" className='my-4 my-4 border-[1px] rounded-md border-gray-600 p-3'>Name-
      <input type="text" name="name" value={newUserData.first_name} onChange={handleChange} id='name' placeholder='Your Name' className='bg-transparent w-3/4 outline-none px-2' />
      </label>
      <label htmlFor="email" className='my-4 my-4 border-[1px] rounded-md border-gray-600 p-3'>Email-
      <input type="email" name="email" value={newUserData.email} onChange={handleChange} placeholder='user@example' className='bg-transparent w-3/4 outline-none px-2' />
      </label>
      <label htmlFor="password" className='my-4 border-[1px] rounded-md border-gray-600 p-3'>Password-
      <input type="password" name="password1" value={newUserData.password1} onChange={handleChange} placeholder='create a strong password' className='bg-transparent w-2/3 outline-none px-2 mx-2' />
      </label>
      <label htmlFor="c_password" className='my-4 border-[1px] rounded-md border-gray-600 p-3'>Password-
      <input type="text" name='password2' value={newUserData.password2} onChange={handleChange} id='c_password' placeholder='confrm password' className='bg-transparent w-2/3 outline-none px-2 mx-2' />
      </label>
      <input type="submit" value='Signup' className='border-[1px] w-fit border-gray-600 py-2 px-4 cursor-pointer m-auto rounded-md'/>
      <p className='text-sm text-gray-300 mt-4'>Are You a New User? <span className='text-blue-500 underline cursor-pointer' onClick={()=>nav('/login')}>Login here</span> </p>
    </form>
    </div>
    </div>  
    
  </div>
  )
}

export default Signup