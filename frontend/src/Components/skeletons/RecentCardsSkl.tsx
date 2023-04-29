import React from 'react'
import { rootReducertype } from '../../Redux/Store'
import { useSelector } from 'react-redux'

const RecentCardsSkl = () => {
  let { drk_theme } = useSelector((val: rootReducertype) => val.theme)
  return (
    <div className={`rounded-2xl my-4 p-4 ${drk_theme?"bg-bg_dark_pri text-font_dark_pri":"bg-bg_light_pri text-font_light_pri"}`}  >
    <div className='flex items-center animate-pulse' >
        <div className={`w-[60px] h-[60px] rounded-full ${drk_theme ? "bg-bg_dark_sec_skl" : "bg-bg_light_sec_skl"}`}>
        </div> 
        <div className={`mx-2 w-3/4 rounded-xl ${drk_theme ? "bg-bg_dark_sec_skl" : "bg-bg_light_sec_skl"} h-12`}></div>
    </div>
        <p className={`${drk_theme ? "bg-bg_dark_sec_skl" : "bg-bg_light_sec_skl"} h-20 animate-pulse rounded-xl my-4 `}> </p>
</div>
  )
}

export default RecentCardsSkl