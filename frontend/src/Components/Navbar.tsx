import React, { Dispatch, useEffect, useState } from 'react'
import { NavLink, useNavigate } from "react-router-dom"
import { CgProfile } from 'react-icons/cg'
import { CiSearch } from 'react-icons/ci'
import { useDispatch, useSelector } from 'react-redux'
import { rootReducertype } from '../Redux/Store'
import { getLoggedinUserProfile, logoutUser, updateToken } from '../Redux/auth/auth.actions'
import { toggleTheme } from '../Redux/theme/theme.actions'
import { AiOutlineCaretDown, AiOutlineCaretUp, AiOutlineLogin, AiOutlinePoweroff, AiOutlineUser } from 'react-icons/ai'
import { BsToggleOff, BsToggleOn } from 'react-icons/bs'
import Alert from './Alert'
import { getRooms, getRoomsSearch } from '../Redux/room/room.action'
import { getTopics } from '../Redux/topic/topic.actions'
const Navbar = () => {
  const dispatch: Dispatch<any> = useDispatch()
  let { isAuth, myData, myId } = useSelector((val: rootReducertype) => val.auth)
  let { drk_theme } = useSelector((val: rootReducertype) => val.theme);

  const nav = useNavigate()
  const [dropdown, setDropdown] = useState(false);
  const [data, setData] = useState<any>(null);
  const [loginAlert, setLoginAlert] = useState(false)
  const [searchValue,setSearchValue] = useState("")


  useEffect(()=>{
    if(isAuth){
        dispatch(getTopics())
        dispatch(getRooms())
    }
  },[dispatch, isAuth])


  useEffect(() => {
    setData(myData)
  }, [myData])
  
  //for getting User's Data
  useEffect(() => {
    if (myId) {
      dispatch(getLoggedinUserProfile(myId))
    }
  }, [dispatch,myId])

  // for token Refresh
  useEffect(() => {
    let id = setInterval(() => {
      if (isAuth) {
        dispatch(updateToken())
      }
    }, 1 * 60 * 1000);
    return () => {
      clearInterval(id)
    }
  }, [dispatch, isAuth])

  // Logout funcation
  const handleLogout = () => {
    dispatch(logoutUser())
    setDropdown(false)
  }

  // goto Profile Page
  const handleProfile = () => {
    nav(`/profile/${myId}`)
    setDropdown(false)
  }
  
  // Search Function
  const handleSearchResult = ()=>{
    if(isAuth){
      if(searchValue.length===0){
        dispatch(getRooms())
      }else{
        nav("/")
        dispatch(getRoomsSearch(searchValue))
      }
    }else{
      setLoginAlert(true)
    } 
  }
  const handleEnterKey:React.KeyboardEventHandler<HTMLInputElement> = (e)=>{
    if(e.key==='Enter'){
      nav("/")
        dispatch(getRoomsSearch(searchValue))
    }
  }
  return (
    <>
    <nav className={`fixed h-[80px] left-0 right-0 top-0 w-screen ${drk_theme ? "bg-bg_dark_sec" : "bg-bg_light_sec"} p-2 z-50 flex items-center px-10 `}>
      <div className='flex m-auto justify-around md:justify-between items-center md:w-11/12 '>
        <div className=''>
          <NavLink to="/" className='text-sm  cursor-pointer md:flex'>
            <img src="/logo.svg" alt="" className='w-10 mr-2' />
            <img src="/dev.svg" alt="" className='mx-2'/>
          </NavLink>
        </div>
        <div className={`w-[50%] px-2 py-3 rounded-full hidden md:flex justify-around ${drk_theme ? "bg-bg_dark_pri text-font_dark_pri" : "bg-bg_light_pri text-font_light_pri"}`}>
          <input onKeyDown={handleEnterKey} onChange={(e)=>{setSearchValue(e.target.value)}} value={searchValue} type="search" className={`w-[80%] bg-bg_pri outline-none ${drk_theme ? "bg-bg_dark_pri text-font_dark_pri" : "bg-bg_light_pri text-font_light_pri"}`} placeholder='Search here..' />
          <CiSearch onClick={handleSearchResult} className='cursor-pointer text-3xl' />
        </div>
        <div className='flex items-center relative' >

          <div onClick={()=>setDropdown(!dropdown)} className='flex justify-center mx-6 items-center cursor-pointer px-4'>
            {isAuth ? <div className='h-14 w-14 rounded-full'><img src={data?.photo} alt="Profile" className='rounded-full' /></div> : <CgProfile className='text-3xl ' />}
            {dropdown ? <AiOutlineCaretUp className='font-bold text-2xl ml-3 text-third_color' /> : <AiOutlineCaretDown className='text-2xl ml-3' />}
          </div>
          {/* DropDown on Profile Click  */}
          {dropdown && <div className='absolute top-[100%] w-full shadow-lg animate-in slide-in-from-top-5 duration-300 '>
            <div className={`${drk_theme ? "bg-bg_dark_sec text-font_dark_pri" : "bg-bg_light_sec text-font_light_pri"} text-center px-2 py-3 rounded-2xl `}>

              {isAuth ? <button onClick={handleProfile} className={`my-3 w-11/12 mx-auto flex justify-evenly items-center ${drk_theme ? "bg-bg_dark_pri text-font_dark_pri" : "bg-bg_light_pri text-font_light_pri"} rounded-full py-2 font-semibold`}> <AiOutlineUser className='mr-2 text-xl' /> Profile</button> : <NavLink to="/signup" onClick={()=>setDropdown(!dropdown)} className={`my-3 w-11/12 mx-auto flex justify-evenly items-center ${drk_theme ? "bg-bg_dark_pri text-font_dark_pri" : "bg-bg_light_pri text-font_light_pri"} rounded-full py-2 px-2 font-semibold`}> <AiOutlineUser className='mr-2 text-xl' /> Register</NavLink>}

              {isAuth ? <button onClick={handleLogout} className={`my-3 w-11/12 mx-auto flex justify-evenly items-center ${drk_theme ? "bg-bg_dark_pri text-font_dark_pri" : "bg-bg_light_pri text-font_light_pri"} rounded-full py-2 font-semibold`}> <AiOutlinePoweroff className='mr-2 text-xl' /> Logout</button> : <NavLink to='/login' onClick={()=>setDropdown(!dropdown)} className={`my-3 w-11/12 mx-auto flex justify-evenly items-center ${drk_theme ? "bg-bg_dark_pri text-font_dark_pri" : "bg-bg_light_pri text-font_light_pri"} rounded-full py-2 px-2 font-semibold`}> <AiOutlineLogin className='mr-2 text-xl' /> Login</NavLink>}

              <div className={`my-3 w-11/12 mx-auto flex justify-evenly items-center ${drk_theme ? "bg-bg_dark_pri text-font_dark_pri" : "bg-bg_light_pri text-font_light_pri"} rounded-full py-2 font-semibold px-2`}>
                {drk_theme ? <BsToggleOn className='cursor-pointer mr-2 text-2xl' onClick={() =>{ dispatch(toggleTheme());setDropdown(false)}} /> : <BsToggleOff onClick={() =>{dispatch(toggleTheme());setDropdown(false)}} className='mr-2 cursor-pointer text-third_dark text-2xl' />}
                Dark
              </div>
            </div>
          </div>}
        </div>
      </div>
      <div className='border-2 border-bg_pri bg-bg_pri px-4 py-2 my-2 rounded-md md:hidden flex justify-around'>
        <input type="search" className='w-[70%] bg-bg_pri outline-none' placeholder='Search' />
        <CiSearch className='cursor-pointer text-2xl' />
      </div>
    </nav>
    {loginAlert&&<Alert text='Login Required' type="error" closeAlert={()=>setLoginAlert(false)} />}
    </>
  )
}

export default Navbar