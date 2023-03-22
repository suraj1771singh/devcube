import React from 'react'
import {NavLink} from "react-router-dom"
import {CgProfile} from 'react-icons/cg'
import {CiSearch} from 'react-icons/ci'
const Navbar = () => {
    return (
        <nav className='fixed left-0 right-0 top-0 w-screen'>
            <div className='flex h-16 m-auto justify-between items-center w-11/12'>
                <div className=''>
                    <NavLink to="/" className='text-xl cursor-pointer'>StudyBuddy</NavLink>
                </div>
                <div className='border-2 border-bg_sec px-4 py-2 rounded-md w-[40%] flex justify-around'>
                    <input type="text" className='w-[70%] bg-bg_pri outline-none' placeholder='Search' />
                   <CiSearch className='cursor-pointer text-2xl' />
                </div>
                <div className=''>
                    <div className='h-12 rounded-full w-12 cursor-pointer'>
                    <CgProfile className='h-10 w-10 font-light' />
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar