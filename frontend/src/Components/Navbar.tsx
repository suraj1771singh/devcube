import React, { Dispatch, useEffect } from 'react'
import {NavLink} from "react-router-dom"
import {CgProfile} from 'react-icons/cg'
import {CiSearch} from 'react-icons/ci'
import {MdDarkMode,MdLightMode} from "react-icons/md"
import { useDispatch, useSelector } from 'react-redux'
import { rootReducertype } from '../Redux/Store'
import { updateToken } from '../Redux/auth/auth.actions'
import { toggleTheme } from '../Redux/theme/theme.actions'
import { CalcTime } from './time'
import { AiOutlineDown, AiOutlinePoweroff, AiOutlineUser } from 'react-icons/ai'
import { BsToggle2Off, BsToggleOff, BsToggleOn } from 'react-icons/bs'
const Navbar = () => {
    const dispatch:Dispatch<any> = useDispatch()
    let {token,isAuth} = useSelector((val:rootReducertype)=>val.auth)
    let {drk_theme} = useSelector((val:rootReducertype)=>val.theme)
    useEffect(() => {
        let interval = setInterval(() => {
            if (token) {
                dispatch(updateToken());
                console.log("refresh called at",CalcTime(1679901285428) )
            }
        }, 3 * 60 * 1000);
        return () => clearInterval(interval);
  }, [dispatch, token]);

    return (
        <nav className={`fixed left-0 right-0 top-0 w-screen ${drk_theme?"bg-bg_dark_sec":"bg-bg_light_sec"} p-2 z-50 flex items-center px-10 `}>
            <div className='flex md:h-14 m-auto justify-around md:justify-between items-center md:w-11/12 '>
                <div className=''> 
                    <NavLink to="/" className='text-sm  cursor-pointer md:flex'>
                        <img src="/logo.svg" alt="" className='w-8' />
                    </NavLink>
                    {/* <NavLink to="/" className='text-sm cursor-pointer md:text-xl'>StudyBuddy</NavLink> */}
                </div>
                <div className={` px-4 py-2 rounded-full md:w-[40%] hidden md:flex justify-around ${drk_theme?"bg-bg_dark_pri text-font_dark_pri":"bg-bg_light_pri text-font_light_pri"} shadow-md`}>
                   <CiSearch className='cursor-pointer text-2xl font-bold' />
                    <input type="text" className={`w-[70%] bg-bg_pri outline-none ${drk_theme?"bg-bg_dark_pri text-font_dark_pri":"bg-bg_light_pri text-font_light_pri"}`} placeholder='Search Here...' />
                </div>
                <div className='flex items-center relative' >
            
                <div className='flex justify-center mx-6 items-center cursor-pointer'>
                   {isAuth?<NavLink to={'/profile'} className='h-14 w-14 rounded-full'><img src="./profile.svg" alt="" /></NavLink>
                    :<CgProfile className='text-3xl '/>}
                    <AiOutlineDown className='font-bold text-xl ml-3'/>
                </div>
                <div className='border-2 border-red-600 absolute top-[100%] w-full' >
                    <div className={`${drk_theme?"bg-bg_dark_sec text-font_dark_pri":"bg-bg_light_sec text-font_light_pri"} p-2 text-center`}>
                        <p className='my-2 w-5/6 flex justify-around items-center'> <AiOutlineUser className='mr-2 text-xl'/> Profile</p>
                        <p className='my-2 w-5/6 flex justify-around justify-center items-center'> <AiOutlinePoweroff className='mr-2 text-xl'/> Logout</p>
                        <div className='w-5/6 flex justify-around items-center'>
                        {drk_theme?<BsToggleOn className='cursor-pointer mr-2 text-2xl' onClick={()=>dispatch(toggleTheme())}/>:<BsToggleOff onClick={()=>dispatch(toggleTheme())} className='mr-2 cursor-pointer text-third_dark text-2xl'/>}
                        Dark
                        </div>
                    </div>
                </div>
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