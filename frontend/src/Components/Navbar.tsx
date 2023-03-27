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
            <div className='flex md:h-14 m-auto justify-around md:justify-between items-center md:w-11/12'>
                <div className=''>
                    <NavLink to="/" className='text-sm  cursor-pointer md:flex'>
                        <img src="/logo.svg" alt="" className='w-8' />
                    </NavLink>
                    {/* <NavLink to="/" className='text-sm cursor-pointer md:text-xl'>StudyBuddy</NavLink> */}
                </div>
                <div className={` px-4 py-2 rounded-full md:w-[40%] hidden md:flex justify-around ${drk_theme?"bg-bg_dark_pri text-font_dark_pri":"bg-bg_light_pri text-font_light_pri"} shadow-md`}>
                    <input type="text" className={`w-[70%] bg-bg_pri outline-none ${drk_theme?"bg-bg_dark_pri text-font_dark_pri":"bg-bg_light_pri text-font_light_pri"}`} placeholder='Search Here...' />
                   <CiSearch className='cursor-pointer text-2xl' />
                </div>
                <div className='flex justify-center items-center h-12 rounded-full w-12 cursor-pointer'>
                   {isAuth?<div><img src="./profile.svg" alt="" /> </div>:<CgProfile className='text-3xl'/>}
                </div>
            </div>
            <div className='border-2 border-bg_pri bg-bg_pri px-4 py-2 my-2 rounded-md md:w-[40%] md:hidden flex justify-around'>
                    <input type="text" className='w-[70%] bg-bg_pri outline-none' placeholder='Search' />
                   <CiSearch className='cursor-pointer text-2xl' />
            </div>
            {drk_theme?<MdLightMode className='text-2xl cursor-pointer text-third_light' onClick={()=>dispatch(toggleTheme())}/>:<MdDarkMode onClick={()=>dispatch(toggleTheme())} className='text-2xl cursor-pointer text-third_dark' />}
        </nav>
    )
}

export default Navbar