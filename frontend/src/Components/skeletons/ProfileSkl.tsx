import React from 'react'
import { useSelector } from 'react-redux'
import { rootReducertype } from '../../Redux/Store'

const ProfileSkl = () => {
    let { drk_theme } = useSelector((val: rootReducertype) => val.theme)
    return (
       <>
            <div className='' >
                <div className='relative flex flex-col'>
                    <div className='absolute left-0 top-0 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-32 animate-pulse'></div>
                    <div className={`flex pb-4 px-4 items-center justify-between mt-28 `}>
                        <div className={`flex z-20 mt-[-10px]`}>
                            <div className={`cursor-pointer ${drk_theme ? "bg-bg_dark_pri_skl" : "bg-bg_light_pri_skl"} w-[120px] h-[120px] overfhow-hidden rounded-full z-20 relative overflow-hidden animate-pulse`}></div>
                            <div className='mx-4 pt-7'>
                                <div className={`flex itemx-center ${drk_theme ? "bg-bg_dark_pri_skl" : "bg-bg_light_pri_skl"} w-[300px] h-16 mt-3 rounded-xl animate-pulse`}>
                                </div>
                            </div>
                        </div>
                        <div className="mt-10 mr-10">
                            <div className={`px-4 py-2 rounded-full ${drk_theme ? "bg-bg_dark_pri_skl" : "bg-bg_light_pri_skl"} w-[100px] h-10 animate-pulse`}> </div>
                        </div>
                    </div>
                </div>
                <div className='m-4'>
                    <div className={`${drk_theme ? "bg-bg_dark_pri_skl" : "bg-bg_light_pri_skl"} h-24 w-5/6 m-auto my-4 animate-pulse`}>
                    </div>
                    <div className='text-center'>
                        <button className={`mx-3 font-semibold p-2 px-5 rounded-full ${drk_theme ? "bg-bg_dark_pri_skl" : "bg-bg_light_pri_skl"} w-[100px] h-10`}></button>
                        <button className={`mx-3 font-semibold p-2 px-5 rounded-full ${drk_theme ? "bg-bg_dark_pri_skl" : "bg-bg_light_pri_skl"} w-[100px] h-10`}></button>
                    </div>
                </div>
                </div>
            </>
            )
}

            export default ProfileSkl