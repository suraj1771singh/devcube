import React from 'react'
import { useSelector } from 'react-redux'
import { rootReducertype } from '../../Redux/Store'

const BrowseTopicsSkeleton = () => {
  let { drk_theme } = useSelector((val: rootReducertype) => val.theme)
  let topics = [1,2,3,4,5,6,7]
  return (
    <div className={`w-[18%] left-[2%] hidden md:flex flex-col ${drk_theme ? "bg-bg_dark_sec_skl" : "bg-bg_light_sec_skl"} fixed rounded-2xl shadow-md h-[80vh] max-h-[80vh] overflow-y-auto scrollbar-hide`}>
    <div className={`sticky top-0 w-full left-0 p-6 pb-2 ${drk_theme ? "bg-bg_dark_sec_skl" : "bg-bg_light_sec_skl"}`}>
      <h3 className={`font-bold mb-4 text-lg animate-pulse ${drk_theme ? "bg-bg_dark_pri_skl" : "bg-bg_light_pri_skl"} h-6 rounded-full w-5/6`}> </h3>
      {/* search for topics  */}
      <div className={`animate-pulse rounded-full flex items-center w-full my-2 ${drk_theme ? "bg-bg_dark_pri_skl" : "bg-bg_light_pri_skl"}`} >
        <div className={`pl-6 w-[80%] h-10`}></div>
      </div>
      <div className='mx-4'>
    {topics.map((el,id:number)=><div key={id} className={`flex font-semibold items-center justify-between my-5 animate-pulse w-5/6 h-8 rounded-xl ${drk_theme ? "bg-bg_dark_pri_skl" : "bg-bg_light_pri_skl"}`} ></div>)}
      </div>
    </div>
    {<button className='flex font-semibold items-center justify-between my-3 mx-8'>
    <p className={`font-semibold animate-pulse h-6 w-20 ${drk_theme ? "bg-bg_dark_pri_skl" : "bg-bg_light_pri_skl"}`}> </p>
    </button>}
  </div>
  ) 
}

export default BrowseTopicsSkeleton