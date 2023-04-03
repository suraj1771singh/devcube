import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { rootReducertype } from '../Redux/Store'
import { TbSend } from 'react-icons/tb'
import Comment from './Comment'

const RoomData = ({data}:any) => {
  const [showComments,setShowComments] = useState(false)
  let { drk_theme } = useSelector((val: rootReducertype) => val.theme)
  let topicsTags=[1,2,3,4,2]
  return (
    
    <div className={`${drk_theme ?"bg-bg_dark_sec text-font_dark_pri" : "bg-bg_light_sec text-font_light_pri"} rounded-2xl p-6 shadow-md ease-in-out duration-500 animate-in slide-in-from-bottom-48`} >
      <div className='' >
        <div className='my-2'>
        <h2 className='text-xl font-bold' >{data?.name}</h2>
        <p className='text-sm font-semibold'>Hosted by</p> 
        </div>
        <div className='flex items-center'>
          <img src="/profile.svg" alt="pp" className='w-[40px] mr-2'/>
          <h3 className='mx-2 font-semibold '>Host Name</h3>
          <p className='text-sm'>2 day ago</p>
        </div>
        <div className='m-6'>
          <p>{data?.description}</p>
        </div>
        <h4 className='font-semibold text-lg my-2' >Topic Tages</h4>
        <div className='my-6 py-3'> 
        {topicsTags?.map((el,id)=><button key={id} className={`${drk_theme?"bg-bg_dark_pri text-font_dark_pri":"bg-bg_light_pri text-font_light_pri"} py-2 mx-4 px-4 rounded-full`} >TagName</button>)}
        </div>
        <div className={` px-2 py-3 rounded-full hidden md:flex justify-around ${drk_theme?"bg-bg_dark_pri text-font_dark_pri":"bg-bg_light_pri text-font_light_pri"}`}>
                    <input type="text" className={`w-[80%] bg-bg_pri outline-none ${drk_theme?"bg-bg_dark_pri text-font_dark_pri":"bg-bg_light_pri text-font_light_pri"}`} placeholder='Add Comment..' />
                    <TbSend className='cursor-pointer text-3xl' />
                </div>
      </div>
      <div className='mt-12'>
        <button onClick={()=>setShowComments(!showComments)} className='text-xl font-semibold my-2'>Comments <span> </span> </button>
       {showComments&&<div>
          <Comment/>
        </div>}
      </div>
    </div>
  )
}

export default RoomData