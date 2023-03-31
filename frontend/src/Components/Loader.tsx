import React from 'react'
import { useSelector } from 'react-redux'
import { rootReducertype } from '../Redux/Store'

const Loader = ({text}:any) => {
  let {drk_theme} = useSelector((val:rootReducertype)=>val.theme)
  return (
    <div className={`w-full fixed text-center top-20 bottom-[90%] z-50 flex items-center z-index-50`}>
    <div className={`animate-in slide-in-from-top duration-500 mx-auto rounded-md py-2 px-4 flex items-center ${drk_theme?"text-font_dark_sec":"text-font_light_sec"} `}>
        <h5 className=''>{text}</h5>
        </div>
    </div>
  )
}

export default Loader