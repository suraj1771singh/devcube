import React from 'react'
import { useSelector } from 'react-redux'
import { rootReducertype } from '../Redux/Store'
import RecentCards from './RecentCards'

const RecentActivites = () => {

    let { drk_theme } = useSelector((val: rootReducertype) => val.theme)
    const rec = [1, 2, 3, 4, 5]
  return (
    <div className={`w-[25%] hidden md:flex flex-col ${drk_theme ? "bg-bg_dark_sec text-font_dark_pri" : "bg-bg_light_sec text-font_light_pri"} fixed rounded-2xl shadow-md right-[2%] overflow-y-scroll h-[80vh] max-h-[80vh] scrollbar-hide animate-in slide-in-from-left-96 ease-in-out duration-500`}>
      <div className={`sticky top-0 w-full left-0 p-6 pb-2 ${drk_theme ? "bg-bg_dark_sec text-font_dark_pri" : "bg-bg_light_sec text-font_light_pri"}`}>
    <h3 className='font-bold my-4'>RECENT ACTIVITIES</h3>
      </div>
    <div className='grid grid-col-1 gap-4 px-4 mt-2' >
        {rec.map((el, id) => <RecentCards key={id} />)}
    </div>
</div>
  )
}
export default RecentActivites