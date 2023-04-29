import React from 'react'
import RecentCardsSkl from './RecentCardsSkl'
import { rootReducertype } from '../../Redux/Store'
import { useSelector } from 'react-redux'

const RecentActivitiesSkl = () => {
  let { drk_theme } = useSelector((val: rootReducertype) => val.theme)
    let recent = [1,2]
  return (
    
    <div className={`w-[25%] hidden md:flex flex-col ${drk_theme ? "bg-bg_dark_sec text-font_dark_pri" : "bg-bg_light_sec text-font_light_pri"} fixed rounded-2xl shadow-md right-[2%] overflow-y-auto h-[80vh] max-h-[80vh] scrollbar-hide animate-in slide-in-from-left-96 ease-in-out duration-500`}>
      <div className={`sticky top-0 w-full left-0 p-6 pb-2 ${drk_theme ? "bg-bg_dark_sec text-font_dark_pri" : "bg-bg_light_sec text-font_light_pri"}`}>
    <h3 className={`font-bold mb-4 text-lg animate-pulse ${drk_theme ? "bg-bg_dark_pri_skl" : "bg-bg_light_pri_skl"} h-8 w-3/4 rounded-lg`}> </h3>
      </div>
    <div className='px-4 my -2' >
    {recent.map((el,id:number) => <RecentCardsSkl key={id} />)}
    </div>
</div>
  )
}

export default RecentActivitiesSkl