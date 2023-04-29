import React from 'react'
import { useSelector } from 'react-redux'
import { rootReducertype } from '../../Redux/Store'

const RoomsCardSkl = () => {
  let { drk_theme } = useSelector((val: rootReducertype) => val.theme)
    const topic = [1,2,4,3]
  return (
    <div className={`my-3 ${drk_theme ? "bg-bg_dark_sec" : "bg-bg_light_sec"} rounded-2xl p-6 shadow-md hover:shadow-xl`} >
    <div className='flex justify-between items-center'>
        <div className={`flex items-center animate-pulse`}>
            <div className={`w-[50px] h-[50px] rounded-full ${drk_theme ? "bg-bg_dark_pri_skl" : "bg-bg_light_pri_skl"}`}>
            </div> 
            <p className={`mx-2 h-12 w-[300px] rounded-xl ${drk_theme ? "bg-bg_dark_pri_skl" : "bg-bg_light_pri_skl"}`}></p>
        </div>
        <div className={`flex flex-col items-end h-[100%] ${drk_theme ? "bg-bg_dark_pri_skl" : "bg-bg_light_pri_skl"} animate-pulse w-12 h-4`}></div>
    </div>
    <div className={`text-left my-4 rounded-xl animate-pulse ${drk_theme ? "bg-bg_dark_pri_skl" : "bg-bg_light_pri_skl"}`}>
        <h3 className=' text-[20px] my-2 h-32 w-full'> </h3>
    </div>
    <div className={`flex justify-between mt-6 animate-pulse`}>
        <div className='flex items-center'>
               <div className={`flex justify-center items-center px-6 py-2 rounded-full mx-2 ${drk_theme ? "bg-bg_dark_pri_skl" : "bg-bg_light_pri_skl"} h-8 w-[140px]`}> </div>
        </div>
        <div className='flex max-w-[60%] overflow-auto scrollbar-hide'>
            {topic.map((el,id:number) => <div key={id} className={`flex justify-center items-center px-6 py-2  rounded-full mx-2 h-10 w-[120px] ${drk_theme ? "bg-bg_dark_pri_skl" : "bg-bg_light_pri_skl"}`}> </div>)}
        </div>
    </div>
</div>
  )
}

export default RoomsCardSkl