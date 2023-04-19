import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { rootReducertype } from '../Redux/Store'
import RecentCards from './RecentCards'
import { Dispatch } from 'redux'
import { getRecentComments } from '../Redux/comments/comments.actions'

const RecentActivites = () => {
  const dispatch:Dispatch<any> = useDispatch()
  useEffect(() => {
    dispatch(getRecentComments())
  }, [dispatch])
  
  const {recentComments} = useSelector((val:rootReducertype)=>val.comments)
    let { drk_theme } = useSelector((val: rootReducertype) => val.theme)
  return (
    <div className={`w-[25%] hidden md:flex flex-col ${drk_theme ? "bg-bg_dark_sec text-font_dark_pri" : "bg-bg_light_sec text-font_light_pri"} fixed rounded-2xl shadow-md right-[2%] overflow-y-scroll h-[80vh] max-h-[80vh] scrollbar-hide animate-in slide-in-from-left-96 ease-in-out duration-500`}>
      <div className={`sticky top-0 w-full left-0 p-6 pb-2 ${drk_theme ? "bg-bg_dark_sec text-font_dark_pri" : "bg-bg_light_sec text-font_light_pri"}`}>
    <h3 className='font-bold my-4'>RECENT ACTIVITIES</h3>
      </div>
    <div className='grid grid-col-1 gap-4 px-4 mt-2' >
        {recentComments?.map((el:any) => <RecentCards key={el.id} data={el} />)}
    </div>
</div>
  )
}
export default RecentActivites