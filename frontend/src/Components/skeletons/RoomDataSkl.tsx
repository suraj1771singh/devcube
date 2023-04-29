import React from 'react'
import { useSelector } from 'react-redux'
import { rootReducertype } from '../../Redux/Store'

const RoomDataSkl = () => {
    let { drk_theme } = useSelector((val: rootReducertype) => val.theme)

    const tags = ["tagone","tegtwo","tegthree","tegfour"]
    return (
        <div className={`${drk_theme ? "bg-bg_dark_sec text-font_dark_pri" : "bg-bg_light_sec text-font_light_pri"} rounded-2xl p-6 shadow-md ease-in-out duration-500 animate-in slide-in-from-bottom-48 mb-20`}>
            <div className='relative animate-pulse' >
                <div className='my-2'>
                <h2 className={`text-2xl font-bold h-12 animate-pulse ${drk_theme ? "bg-bg_dark_pri_skl": "bg-bg_light_pri_skl"} w-1/4 rounded-xl`}> </h2>
                    <p className='text-sm font-semibold text-fade_font my-2 h-4'> </p>
                </div>
                <div className={`flex items-center`}>
                    <p className={`w-[60px] h-[60px] rounded-full mr-4 ${drk_theme ? "bg-bg_dark_pri_skl": "bg-bg_light_pri_skl"}`}></p>
                    <h3 className={`mx-2 font-semibold animate-pulse ${drk_theme ? "bg-bg_dark_pri_skl": "bg-bg_light_pri_skl"} w-1/3 rounded-xl h-10`}> </h3>
                </div>
                <div className={`my-6 mx-10 h-32  rounded-xl ${drk_theme ? "bg-bg_dark_pri_skl": "bg-bg_light_pri_skl"}`}>
                </div>
                <h4 className={`font-semibold text-xl my-2 h-10 w-1/2 ${drk_theme ? "bg-bg_dark_pri_skl": "bg-bg_light_pri_skl"}`}> </h4>
                <div className='my-4'>
                    {tags.map((el, id: number) => <button key={id} className={`${drk_theme ? "bg-bg_dark_pri text-font_dark_pri" : "bg-bg_light_pri text-font_light_pri"} py-2 mr-6 px-4 my-4 rounded-full w-32 h-12`} > </button>)}
                </div>
                <p className={`w-[80%] overflow-hidden bg-bg_pri outline-none ${drk_theme ? "bg-bg_dark_pri text-font_dark_pri" : "bg-bg_light_pri text-font_light_pri "} min-h-[20px] max-h-[200px] resize-none overflow-y-auto h-20 rounded-xl`}> </p>
            </div>
        </div>
  )
}

export default RoomDataSkl