import React, { useState,Dispatch, useEffect } from 'react'
import {useNavigate} from "react-router-dom"
import {useDispatch,useSelector} from 'react-redux'
import { registerUser } from '../Redux/auth/auth.actions' 
import { rootReducertype } from '../Redux/Store'
import Loader from '../Components/Loader'
import Alert from '../Components/Alert'
import { BiHide, BiShow } from 'react-icons/bi'
const Signup = () => {
  const nav = useNavigate()
  let {drk_theme} = useSelector((val:rootReducertype)=>val.theme)
  const {isAuth,signup_error,signup_loading,signup_success}  = useSelector((val:rootReducertype)=>val?.auth);
  const [passMissmatchAlert,setPassMissmatchAlert] = useState(false)
  const dispatch:Dispatch<any> = useDispatch()
  const [newUserData,setNewUserData]= useState({first_name:"",last_name:"",email:"",password1:"",password2:""})
  const [showPass,setShowPass] = useState(false)
  useEffect(() => {
    if(isAuth){
      nav("/")
    }
    if(signup_success){
      window.location.href="/login"
    }
  }, [isAuth, nav,signup_success])
  const handleChange = (e: { target: { name: any; value: any } })=>{
    setNewUserData({...newUserData,[e.target.name]:e.target.value})
  }
  const handlesignup = (e: { preventDefault: () => void })=>{
    e.preventDefault()
    if(newUserData.password1===newUserData.password2){
      dispatch(registerUser(newUserData))
    }else{
     setPassMissmatchAlert(true)
    }
  } 
  return (
    <>
    <div className='w-11/12 m-auto'>
    <div className='w-1/2 m-auto items-center flex flex-col pt-4'>
      <h3 className='font-bold text-2xl'>
        Register
      </h3>
    <div className={`shadow-md rounded-md p-6 w-3/4 mt-4 ${drk_theme?"bg-bg_dark_sec text-font_dark_pri":"bg-bg_light_sec text-font_light_pri"}`}>
    <form className='flex flex-col' onSubmit={handlesignup} >

      <label htmlFor="name" className='my-4 my-4 border-[1px] rounded-md border-gray-700 p-3 flex'>Name-
      <input type="text" required name="first_name" value={newUserData.first_name} onChange={handleChange} id='name' placeholder='First Name' className='bg-transparent w-3/4 outline-none px-2' />
      <span className='text-gray-500'>|</span>
      <input type="text" name="last_name" value={newUserData.last_name} onChange={handleChange} id='last_name' placeholder='Last Name' className='bg-transparent w-3/4 outline-none px-2' />
      </label>
      <label htmlFor="email" className='my-4 my-4 border-[1px] rounded-md border-gray-700 p-3'>Email
      <input required type="email" name="email" value={newUserData.email} onChange={handleChange} placeholder='valid_email@example.com' className='bg-transparent w-3/4 outline-none px-2' />
      </label>
      <label htmlFor="password" className='my-4 border-[1px] rounded-md border-gray-700 p-3 flex items-center'>Password
      <input required type={`${showPass?"text":"password"}`} name="password1" value={newUserData.password1} onChange={handleChange} placeholder='create a strong password' className='bg-transparent w-2/3 outline-none px-2 mx-2' />{showPass?<span><BiShow onClick={()=>setShowPass(false)} className='text-2xl cursor-pointer'/></span>:<span><BiHide onClick={()=>setShowPass(true)} className='text-2xl cursor-pointer'/></span>}
      </label>
      <label htmlFor="c_password" className='my-4 border-[1px] rounded-md border-gray-700 p-3'>Confrm Password
      <input required type="password" name='password2' value={newUserData.password2} onChange={handleChange} id='c_password' placeholder='password (Same as Above)' className='bg-transparent outline-none px-2 mx-2' />
      </label>
      {signup_loading?<button disabled className='border-[1px] w-fit border-gray-700 py-2 px-4 cursor-pointer m-auto rounded-md' >Loading...</button>:<input type="submit" value='Signup' className='border-[1px] w-fit border-gray-700 py-2 px-4 cursor-pointer m-auto rounded-md'/>}
      <p className='text-sm text-gray-500 mt-4'>Are You a New User? <span className='text-blue-500 underline cursor-pointer' onClick={()=>nav('/login')}>Login here</span> </p>
    </form>
    </div>
    </div>  
  </div>
  {signup_loading&&<Loader text={"Signup in Process...."} />}
  {signup_error&&<Alert text='Signup Error! All Checks are not followed' type='error' />}
  {signup_success&&<Alert text='User Registration Success full. Login Now' type="success" />}
  {passMissmatchAlert&&<Alert text='password and confrm-password should be same' type="error" />}
  </>
  )
}

export default Signup