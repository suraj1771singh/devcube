import React, { Dispatch, useEffect, useState } from 'react'
import {NavLink, useNavigate} from "react-router-dom"
import {CgProfile} from 'react-icons/cg'
import {CiSearch} from 'react-icons/ci'
import { useDispatch, useSelector } from 'react-redux'
import { rootReducertype } from '../Redux/Store'
import { logoutUser, updateToken } from '../Redux/auth/auth.actions'
import { toggleTheme } from '../Redux/theme/theme.actions'
import { AiOutlineCaretDown, AiOutlineCaretUp, AiOutlineLogin, AiOutlinePoweroff, AiOutlineUser } from 'react-icons/ai'
import { BsToggleOff, BsToggleOn } from 'react-icons/bs'
const Navbar = () => {

    const dispatch:Dispatch<any> = useDispatch()
    let {token,isAuth,myData} = useSelector((val:rootReducertype)=>val.auth)
    let {drk_theme} = useSelector((val:rootReducertype)=>val.theme);
    const nav = useNavigate()
    const [dropdown,setDropdown] = useState(false);
    useEffect(() => {
        let interval = setInterval(() => {
            if (token) {
                dispatch(updateToken());
            }
        }, 3 * 60 * 1000);
        return () => clearInterval(interval);
  }, [dispatch, token]);
  const toggleDropdown = ()=>{
    setDropdown(!dropdown)
  }
  const handleLogout = ()=>{
    dispatch(logoutUser())
    toggleDropdown()
  }
  const handleProfile = (myData:any)=>{
    nav(`/profile/${myData.user_id}`)
    toggleDropdown()
  }
    return (
        <nav className={`fixed h-[80px] left-0 right-0 top-0 w-screen ${drk_theme?"bg-bg_dark_sec":"bg-bg_light_sec"} p-2 z-50 flex items-center px-10 `}>
            <div className='flex m-auto justify-around md:justify-between items-center md:w-11/12 '>
                <div className=''> 
                    <NavLink to="/" className='text-sm  cursor-pointer md:flex'>
                        <img src="/logo.svg" alt="" className='w-8' />
                    </NavLink>
                </div>
                <div className={`w-[50%] px-2 py-3 rounded-full hidden md:flex justify-around ${drk_theme?"bg-bg_dark_pri text-font_dark_pri":"bg-bg_light_pri text-font_light_pri"}`}>
                    <input type="text" className={`w-[80%] bg-bg_pri outline-none ${drk_theme?"bg-bg_dark_pri text-font_dark_pri":"bg-bg_light_pri text-font_light_pri"}`} placeholder='Add Comment..' />
                    <CiSearch className='cursor-pointer text-3xl' />
                </div>
                <div className='flex items-center relative' >
            
                <div onClick={toggleDropdown} className='flex justify-center mx-6 items-center cursor-pointer px-4'>
                   {isAuth?<div className='h-14 w-14 rounded-full'><img src="/profile.svg" alt=""/></div>
                    :<CgProfile className='text-3xl '/>}
                    {dropdown?<AiOutlineCaretUp className='font-bold text-2xl ml-3 text-third_color'/>:<AiOutlineCaretDown className='text-2xl ml-3'/>}
                </div>
                            {/* DropDown on Profile Click  */}
                { dropdown&&<div className='absolute top-[100%] w-full shadow-lg animate-in slide-in-from-top-5 duration-300 '>
                    <div className={`${drk_theme?"bg-bg_dark_sec text-font_dark_pri":"bg-bg_light_sec text-font_light_pri"} text-center px-2 py-3 rounded-2xl `}>

                        {isAuth?<button onClick={()=>handleProfile(myData)} className={`my-3 w-11/12 mx-auto flex justify-evenly items-center ${drk_theme?"bg-bg_dark_pri text-font_dark_pri":"bg-bg_light_pri text-font_light_pri"} rounded-full py-2 font-semibold`}> <AiOutlineUser className='mr-2 text-xl'/> Profile</button>:<NavLink to="/signup" onClick={toggleDropdown} className={`my-3 w-11/12 mx-auto flex justify-evenly items-center ${drk_theme?"bg-bg_dark_pri text-font_dark_pri":"bg-bg_light_pri text-font_light_pri"} rounded-full py-2 px-2 font-semibold`}> <AiOutlineUser className='mr-2 text-xl'/> Register</NavLink>}

                        {isAuth?<button onClick={handleLogout} className={`my-3 w-11/12 mx-auto flex justify-evenly items-center ${drk_theme?"bg-bg_dark_pri text-font_dark_pri":"bg-bg_light_pri text-font_light_pri"} rounded-full py-2 font-semibold`}> <AiOutlinePoweroff className='mr-2 text-xl'/> Logout</button>:<NavLink to='/login' onClick={toggleDropdown} className={`my-3 w-11/12 mx-auto flex justify-evenly items-center ${drk_theme?"bg-bg_dark_pri text-font_dark_pri":"bg-bg_light_pri text-font_light_pri"} rounded-full py-2 px-2 font-semibold`}> <AiOutlineLogin className='mr-2 text-xl'/> Login</NavLink>}

                        <div className={`my-3 w-11/12 mx-auto flex justify-evenly items-center ${drk_theme?"bg-bg_dark_pri text-font_dark_pri":"bg-bg_light_pri text-font_light_pri"} rounded-full py-2 font-semibold px-2`}>
                        {drk_theme?<BsToggleOn className='cursor-pointer mr-2 text-2xl' onClick={()=>dispatch(toggleTheme())}/>:<BsToggleOff onClick={()=>dispatch(toggleTheme())} className='mr-2 cursor-pointer text-third_dark text-2xl'/>}
                        Dark
                        </div>
                    </div>
                </div>}
                </div>
            </div>
            <div className='border-2 border-bg_pri bg-bg_pri px-4 py-2 my-2 rounded-md md:hidden flex justify-around'>
                    <input type="text" className='w-[70%] bg-bg_pri outline-none' placeholder='Search' />
                   <CiSearch className='cursor-pointer text-2xl' />
            </div>
        </nav>
    )
}
 
export default Navbar