import React from 'react'
import { useSelector } from 'react-redux'
import { rootReducertype } from '../Redux/Store'
import RecentCards from './RecentCards'

const RecentActivites = () => {
    let { drk_theme } = useSelector((val: rootReducertype) => val.theme)
    const rec = [1, 2, 3, 4, 5]
  return (
    <div className={`w-[25%] hidden md:flex flex-col ${drk_theme ? "bg-bg_dark_sec text-font_dark_pri" : "bg-bg_light_sec text-font_light_pri"} fixed rounded-2xl py-8 px-4 shadow-md right-[2%] overflow-y-scroll h-[80vh] max-h-[80vh] scrollbar-hide animate-in slide-in-from-left-96 ease-in-out duration-500`}>
    <h3 className='font-bold mb-10 text-center'>RECENT ACTIVITIES</h3>
    <div className='grid grid-col-1 gap-3' >
        {rec.map((el, id) => <RecentCards key={id} />)}
    </div>
</div>
  )
}
 
export default RecentActivites